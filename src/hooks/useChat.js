
import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import formatMessage from '../components/messageformated';
import { GlobalContext } from '../context/GlobalContext';
import { translations } from '../locales/translations_chat';

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const LIMIT = 20;

const useChat = () => {
  const { language, serverStatus, file, setFile } = useContext(GlobalContext);
  // useEffect(() => {
  // console.log('file in useChat:', file);
  // }, [file]);
  const t = translations[language] || translations.fr;

  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  const { user, isLoaded, isSignedIn } = useUser();
  const { firstName, lastName, primaryEmailAddress: emailAdresses } = user || {};
  const user_id = user?.id;

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionFormId, setQuestionFormId] = useState('');

  const [sendingMessage, setSendingMessage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [count, setCount] = useState(4);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const retryTimerRef = useRef(null);
  const textAreaRef = useRef(null);

  const loadChatHistory = useCallback(async (pageNum = 1) => {
    try {
      if (!isSignedIn) return;
      setError(null);
      setIsLoading(true);
      const response = await fetch(`${BACK_END_URL}/api/history?user_id=${user_id}&page=${pageNum}&limit=${LIMIT}`);

      if (response.status >= 500) {
        throw new Error(t.FailedToLoadHistory);
      }

      const data = await response.json();
      if ('error' in data) {
        //throw new Error(data.error);
      }
      if (!response.ok) throw new Error(t.FailedToLoadHistory);

      let history = data.history;

      if (!history.length) {
        const initResponse = await fetch(`${BACK_END_URL}/api/chat?user_id=${user_id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: t.greeting(firstName, lastName, emailAdresses, language ) }),
        });

        if (initResponse.status >= 500) {
          throw new Error(t.FailedToLoadHistory);
        }

        const initData = await initResponse.json();
        if ('error' in initData) {
          throw new Error(initData.error);
        }
        if (!initResponse.ok) throw new Error(t.FailedToInitializeChat);

        history = [
          { role: 'user', parts: t.greeting(firstName, lastName, emailAdresses, language ) },
          { role: 'model', parts: formatMessage({ parts: initData.response, role: 'model' }) },
        ];
      }

      const formattedHistory = history.map((msg) => ({
        role: msg.role,
        parts: formatMessage(msg),
      }));

      setQuestionFormId(data.form_id);
      setPage(data.page);
      setMaxPage(data.max_page);
      setMessages(formattedHistory);
    } catch (error) {
      setError(error.message);
      console.error('Error loading chat history:', error.message);
      retryTimerRef.current = setTimeout(() => {
        setError(null);
        loadChatHistory();
      }, 5000);
    } finally {
      setIsLoading(false);
      setShouldScrollToBottom(true);
    }
  }, [user_id, isSignedIn, t, firstName, lastName, emailAdresses, language]);

  const loadMoreHistory = useCallback(async () => {
    if (loadingMore || page >= maxPage) return;

    setLoadingMore(true);
    setShouldScrollToBottom(false);
    setError(null);

    const scrollContainer = chatContainerRef.current;
    const oldScrollHeight = scrollContainer ? scrollContainer.scrollHeight : 0;

    try {
      const nextPage = page + 1;
      const response = await fetch(`${BACK_END_URL}/api/history?user_id=${user_id}&page=${nextPage}&limit=${LIMIT}`);

      if (!response.ok) {
        throw new Error(t.FailedToLoadHistory);
      }

      const data = await response.json();
      if ('error' in data) {
        throw new Error(data.error);
      }

      const formattedHistory = data.history.map((msg) => ({
        role: msg.role,
        parts: formatMessage(msg),
      }));

      setMessages((prevMessages) => [...formattedHistory, ...prevMessages]);
      setPage(data.page);
      setMaxPage(data.max_page);

      if (scrollContainer) {
        const newScrollHeight = scrollContainer.scrollHeight;
        scrollContainer.scrollTop = newScrollHeight - oldScrollHeight;
      }
    } catch (error) {
      setError(error.message);
      console.error('Error loading more chat history:', error.message);
    } finally {
      setLoadingMore(false);
    }
  }, [user_id, page, maxPage, loadingMore, t]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      if (scrollTop === 0) {
        loadMoreHistory();
      }
    }
  };

  const handleMessageSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setError(null);
    setSendingMessage(true);
    setShouldScrollToBottom(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', parts: formatMessage({ parts: textAreaRef.current?.value, role: 'user' }) },
    ]);

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    let params;
    // console.log("File being sent:", file);
    if(file) {
      file.append('message', textAreaRef.current?.value);
      params = {
        method: 'POST',
        body: file,
      };
    } else {
      params = {
        method: 'POST',
        body: JSON.stringify({ message: textAreaRef.current?.value}),
        headers: { 'Content-Type': 'application/json' },
        };
    }

    try {
      const response = await fetch(`${BACK_END_URL}/api/chat?user_id=${user_id}`, params);

      if (response.status >= 500) {
        throw new Error(t.FailedToLoadHistory);
      }

      const data = await response.json();
      if ('error' in data) {
        throw new Error(data.error);
      }

      if (!response.ok) throw new Error(t.errorMessage);
      setShouldScrollToBottom(true);
      setMessages((prevMes) => [
        ...prevMes.slice(0, -1),
        { role: 'user', parts: formatMessage({ parts: data.user_message, role: 'user' }) },
        { role: 'model', parts: formatMessage({ parts: data.response, role: 'model' }) },
      ]);

      setQuestionFormId(data.form_id);
      setIsButtonDisabled(false);
      setSendingMessage(false);
      setFile(null);
    } catch (error) {
      setCount(4);
      setError(error.message);
      console.error('Error sending message:', error);
      setIsButtonDisabled(true);

      setTimeout(() => {
        setSendingMessage(false);
        setMessages((prevMes) => [...prevMes.slice(0, -1)]);
        setError(null);
        setIsButtonDisabled(false);
      }, 4000);
    } finally {
      if (textAreaRef.current) {
        textAreaRef.current.value = '';
      }
    }
  }, [user_id, t, file, setFile]);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    setIsButtonDisabled(true);
    formObject.language = language;
    let jsonData = JSON.stringify(formObject);

    try {
      setError(null);
      const response = await fetch(`${BACK_END_URL}/api/answers?user_id=${user_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData,
      });

      if (response.status >= 500) {
        throw new Error(t.FailedToLoadHistory);
      }
      if (!response.ok) throw new Error(t.errorMessage);

      await loadChatHistory();
    } catch (error) {
      setError(error.message);
      console.error('Error submitting form:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  }, [language, user_id, loadChatHistory, t]);

  useEffect(() => {
    if (isSignedIn) {
      loadChatHistory();
    }
  }, [isSignedIn, loadChatHistory]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current && shouldScrollToBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    scrollToBottom();
  }, [messages, error, shouldScrollToBottom, messagesEndRef]);

  useEffect(() => {
    const question_form = document.getElementById(questionFormId);
    if (question_form) {
      question_form.style.display = 'block';
      question_form.addEventListener('submit', handleFormSubmit);
      return () => question_form.removeEventListener('submit', handleFormSubmit);
    }
  }, [questionFormId, handleFormSubmit]);

  useEffect(() => {
    if (count <= 0 || !error) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [error, count]);

  return {
    messages,
    loadingMore,
    isLoading,
    error,
    questionFormId,
    chatContainerRef,
    messagesEndRef,
    textAreaRef,
    handleScroll,
    sendingMessage,
    isButtonDisabled,
    count,
    handleMessageSubmit,
    handleFormSubmit,
    t,
    isLoaded,
    isSignedIn,
    serverStatus,
  };
};

export default useChat;
