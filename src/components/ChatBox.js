import React from 'react'
import PropTypes from 'prop-types'

const ChatBox = ({ handleOnChange, currentMessage }) => {
  return (
    <div className="input-group">
      <span>+</span>
      <input
        onChange={(e) => handleOnChange(e)}
        value={currentMessage}
        placeholder="Jot something down"
      />
    </div>
  )
}

ChatBox.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  currentMessage: PropTypes.string.isRequired
}

export default ChatBox
