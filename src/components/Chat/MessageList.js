import React, { useMemo, memo } from 'react';

const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

const MessageList = ({
  messages,
  chatContainerRef,
  handleScroll,
  loadingMore,
  loadingMoreText,
  errorMessage,
  errorCount,
  messagesEndRef,
}) => {
  const memoizedMessages = useMemo(() => {
    return messages.map((msg, index) => {
      const direction = arabicRegex.test(msg.parts) ? 'rtl' : 'ltr';
      return (
        <div
          key={index}
          className={`mb-4 overflow-x-auto ${
            direction === 'ltr' ? 'text-left' : 'text-right'
          }  p-2 rounded-md odd:bg-blue-500 odd:text-white even:bg-gray-200 even:text-gray-900 odd:mr-1 even:ml-1`}
          dir={direction}
        >
          <div dangerouslySetInnerHTML={{ __html: msg.parts }} />
        </div>
      );
    });
  }, [messages]);

  return (
    <div
      id="messages"
      ref={chatContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-t-md"
    >
      {loadingMore && <div className="text-center p-2 text-gray-500">{loadingMoreText}</div>}
      {memoizedMessages}
      {errorMessage && (
        <div className="text-red-500 text-center bg-red-200 p-2 rounded-md">
          <p>
            {errorMessage} <strong>{errorCount}</strong>
          </p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default memo(MessageList);
