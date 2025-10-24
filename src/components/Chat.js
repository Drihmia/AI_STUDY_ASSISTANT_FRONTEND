
import React, { memo } from 'react';
import useChat from '../hooks/useChat';
import Loading from './Loading';
import SignInPrompt from './Chat/SignInPrompt';
import ServerStatus from './Chat/ServerStatus';
import MessageList from './Chat/MessageList';
import ChatInput from './Chat/ChatInput';

const Chat = () => {
  const {
    messages,
    loadingMore,
    isLoading,
    error,
    chatContainerRef,
    messagesEndRef,
    textAreaRef,
    handleScroll,
    sendingMessage,
    isButtonDisabled,
    count,
    handleMessageSubmit,
    t,
    isLoaded,
    isSignedIn,
    serverStatus,
  } = useChat();

  if (serverStatus === 'offline' || serverStatus === 'starting') {
    return <ServerStatus serverStatus={serverStatus} t={t} />;
  }

  if (isLoaded && !isSignedIn) {
    return <SignInPrompt t={t} />;
  }

  if ((isLoading && !error) || !isLoaded) {
    return <Loading location="/chat" />;
  }

  return (
    <div className="flex overflow-y-auto flex-col flex-1 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <MessageList
        messages={messages}
        chatContainerRef={chatContainerRef}
        handleScroll={handleScroll}
        loadingMore={loadingMore}
        loadingMoreText={t.loadingMore}
        errorMessage={error}
        errorCount={count}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        ref={textAreaRef}
        handleMessageSubmit={handleMessageSubmit}
        isButtonDisabled={isButtonDisabled}
        sendingMessage={sendingMessage}
        placeholderText={t.placeholderText}
      />
    </div>
  );
};

export default memo(Chat);