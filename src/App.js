import React, { Component } from 'react'

import RoomsList from './components/RoomsList'
import CurrentRoom from './components/CurrentRoom'
import Messages from './components/Messages'
import ChatBoxContainer from './containers/ChatBoxContainer'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      messages: ['Welcome!']
    }

    this.addMessage = this.addMessage.bind(this)
  }
  
  addMessage(message) {
    const messages = this.state.messages
    messages.push(message);
    this.setState({messages})

    // Make sure we're always at the bottom of the div
    const messageContainer = document.querySelector('.messages-container');
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
  }
  
  render() {
    return (
      <div className="app">
        <RoomsList />
        <CurrentRoom />
        <div className="chat-container">
          <Messages messages={this.state.messages}/>
          <ChatBoxContainer addMessage={this.addMessage} />
        </div>
      </div>
    )
  }
}

export default App;
