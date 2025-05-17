import React from 'react'
import { Card } from 'react-bootstrap'

function NoChatContainer() {
  return (
    <div className='mx-auto min-vh-100 d-flex align-items-center justify-content-center'>
      <Card>
        <Card.Body>
          <h2>Welcome to ChitChatNow!</h2>
          <p>Select a conversation from the sidebar to start chatting.</p>
        </Card.Body>
      </Card>
    </div>

  )
}

export default NoChatContainer