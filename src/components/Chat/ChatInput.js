import React, { forwardRef, memo } from 'react';
import ChatInputFile from './ChatInputFile';

const ChatInput = memo(forwardRef(({ handleMessageSubmit, isButtonDisabled, sendingMessage, placeholderText }, ref) => {

  //const { file, setFile } = useContext(GlobalContext);
  return (
    <form onSubmit={(e) => handleMessageSubmit(e) } className="flex items-center space-x-2 p-2 bg-gray-100">
      {/* Textarea for message input */}
      <textarea
        id="message"
        rows="2"
        autoFocus
        aria-label="Type your message"
        ref={ref}
        name="message"
        className={`w-full h-full p-2 border-gray-300 rounded-md bg-white ${
          sendingMessage ? 'text-gray-300' : 'text-gray-900'
        } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none`}
        placeholder={placeholderText}
        maxLength="1000"
        dir="auto"
        required
      />
      
      {/* File Upload Component */}
      <ChatInputFile />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isButtonDisabled}
        aria-label="Send message"
        className="h-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700 flex justify-center items-center w-24 h-[85%]"
      >
        {isButtonDisabled ? (
          <div className="animate-spin rounded-full h-9 w-9 border-4 border-t-transparent border-white"></div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-[90%] h-[90%]"
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        )}
      </button>
    </form>
  );
}));

export default ChatInput;
