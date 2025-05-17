import React, { Fragment, useEffect, useRef } from 'react'
import { useChatStore } from '../../Store/useChatStore';
import MessageItem from './MessageItem';
import { formatDateHeader, formatTime } from '../Lib/utils';

function MessageList() {
  const { messages, getMessages, isMessagesLoading, selectedUser, setTyping, isTyping } = useChatStore();


  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const messagesByDate = messages.reduce((groups, message) => {
    const date = formatDateHeader(message.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});


  return (
    <>
      <div className="message-list">
        {isMessagesLoading ?
          (
            <div className="message-list">Loading messages...</div>
          ) : (
            <>
              {Object.keys(messagesByDate).map((date) => (
                <Fragment key={date}>
                  <div className="date-divider">
                    <span>{date}</span>
                  </div>
                  {messagesByDate[date].map((message) => (
                    <MessageItem key={message._id} message={message} />
                  ))}
                </Fragment>
              ))}
            </>
          )}
        {/* Show typing indicator */}
        {isTyping && (
          <div className="message-group message-incoming">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div >
    </>
  )
}

export default MessageList