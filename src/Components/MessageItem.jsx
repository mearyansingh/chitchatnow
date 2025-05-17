import React from 'react'
import { useAuthStore } from '../../Store/useAuthStore'
import { Image } from 'react-bootstrap'
import { formatTime } from '../Lib/utils'

function MessageItem({ message }) {
  const { authUser } = useAuthStore()
  return (
    <>
      {/* <div className={`message-group ${isOutgoing ? 'message-outgoing' : 'message-incoming'}`}> */}
      <div className={`message-group ${message?.senderId === authUser._id ? 'message-outgoing' : 'message-incoming'}`}>

        <div className="message-bubble">
          <div className="message-text">{message.text}</div>
        </div>
        <div className="text-end">
          <span className="message-time text-secondary">{formatTime(message.createdAt)}</span>
        </div>
        {message.image && (
          <Image
            fluid
            src={message.image}
            alt=''
            width={100}
            height={100}
            className='rounded'
          />
        )}
      </div>
    </>
  )
}

export default MessageItem