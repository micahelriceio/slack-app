import React from 'react'

const Messages = ({ messages }) => {
  return (
    <div id="messageContainer" className="messages-container">
      {messages.map((message, index) => <p key={index}>{message}</p>)}      
    </div>
  )
}

export default Messages
