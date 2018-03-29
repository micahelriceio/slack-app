import React from 'react'

const CurrentRoom = () => {
  return (
    <div className="current-room-container">
      <h2>Reflen</h2>
      <ul>
        <li className="title">Channels</li>
        <li>general</li>
        <li>dev</li>
        <li>random</li>
      </ul>
      <ul>
        <li className="title">Direct Messages</li>
        <li>slackbot</li>
        <li>homer</li>
        <li>michael</li>
      </ul>
    </div>
  )
}

export default CurrentRoom
