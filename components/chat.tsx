import { useChat } from 'ai/react';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

const MAX_MESSAGES = 10;

export default function Chat() {

  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit } = useChat();
  const [isInputEmpty, setInputEmpty] = useState(true);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    setInputEmpty(input === '');
  }, [input]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const currentDate = new Date().toDateString();
    const cookieDate = Cookies.get('cookieDate');
    if (cookieDate === undefined || cookieDate !== currentDate) {
      Cookies.set('sentMessages', '0');
      Cookies.set('cookieDate', currentDate);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sentMessages = Cookies.get('sentMessages') ? parseInt(Cookies.get('sentMessages')) : 0;
    if (sentMessages < MAX_MESSAGES) {
      Cookies.set('sentMessages', sentMessages + 1);
      originalHandleSubmit(e);
    } else {
      alert('Sie haben bereits die maximale Anzahl von Nachrichten für heute erreicht.');
    }
  };

    return (
      <div className="max-h-[60vh] flex flex-col">
        <div className="overflow-y-auto p-4 flex-grow" ref={messagesContainerRef}>
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`p-2 rounded-lg my-2 ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800'} inline-block max-w-2/3 whitespace-pre-wrap`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              className="flex-grow p-2 rounded-lg border border-gray-200"
              value={input}
              onChange={handleInputChange}
              placeholder="Schreibe eine Nachricht"
            />
            <button 
              className={`p-1 rounded-lg text-white ${isInputEmpty ? 'bg-gray-300' : 'bg-blue-500'}`}
              type="submit"
              disabled={isInputEmpty}
              style={{ backgroundColor: isInputEmpty ? '#D1D5DB' : '#2563EB' }}  // Add your colors here
            >
              <img src="/icons/send.svg" alt="Send" />
            </button>
          </form>
        </div>
      </div>
    );
  }
