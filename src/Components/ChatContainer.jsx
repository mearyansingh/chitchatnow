import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { useChatStore } from '../../Store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';


function ChatContainer({ setShowSidebar }) {

  const { getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    return () => {
      unsubscribeFromMessages()
    }
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])


  return (
    <>
      <ChatHeader setShowSidebar={setShowSidebar} />
      <MessageList />
      <ChatInput />
    </>
  )
}

export default ChatContainer