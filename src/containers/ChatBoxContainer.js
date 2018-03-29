import React, { Component } from 'react'

// The commands are just a hardcoded javascript object.
import actionsList from '../actionsList'
import ChatBox from '../components/ChatBox'
import ActionsBox from '../components/ActionsBox'

// ChatBoxContainer is where most of the logic is. It has two main methods:
// handleKeyPress and handleOnChange. 
//
// handleKeyPress will enter the command/message when the user presses enter.
// It also listens for the up, down and tab keys when actionsBox is displayed.
// You can use these keys to cylce through the commands.
//
// handleOnChange is fired when the message box's input value is updated. 
// It checks if the message begins with "/", if it does it will compare
// the command against the list of commands available in the actionsList 
// object, filtering out commands that do not match as more characters are
// typed. If the string does not begin with "/", the value is simply updated
// in the input.
class ChatBoxContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentMessage: '',
      actions: [],
      keysPressed: []
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    document.addEventListener("keyup", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    document.removeEventListener("keyup", this.handleKeyPress)
  }

  handleKeyPress(e) {
    const { actions, keysPressed, currentMessage } = this.state
    const { addMessage } = this.props
    
    // Capture keydown pressses
    keysPressed[e.keyCode] = e.type === 'keydown'
    this.setState({ keysPressed })
    
    // Enter Key
    if (keysPressed[13]) {
      // Decide whether or not we're sending a command or a message
      if (actions.length > 0) {
        const command = actions.find(action => action.active)
        const message = `Entered Command: "${command.action}"`
        addMessage(message)
      } else {
        addMessage(currentMessage)
      }
      
      this.setState({ currentMessage: '' })
      this.setState({ actions: [] }) 
    }
    
    // We only need to listen for the other key presses
    // when we have actions available
    if (actions.length > 0) {
      // Escape Key
      if (keysPressed[27]) {
        this.setState({ actions: [] })
      }

      // Tab or Down Arrow Key
      if (keysPressed[9] || keysPressed[40]) {
        e.preventDefault() // Stop tab focus from moving

        // Find the current active action, get it's index and
        // increment by one, or reset to 0
        const currentActive = actions.find(action => action.active)
        const currentActiveIndex = actions.indexOf(currentActive)

        actions[currentActiveIndex].active = false
        if (actions[currentActiveIndex + 1]) {
          actions[currentActiveIndex + 1].active = true
        } else {
          actions[0].active = true
        }

        this.setState({ actions })
      }
      
      // Up Arrow Key
      if (keysPressed[38]) {
        e.preventDefault() // Stop tab focus from moving
        
        // Find the current active action, get it's index and
        // decrement by one, or set to last index in array
        const currentActive = actions.find(action => action.active)
        const currentActiveIndex = actions.indexOf(currentActive)

        actions[currentActiveIndex].active = false

        if (actions[currentActiveIndex - 1]) {
          actions[currentActiveIndex - 1].active = true
        } else { 
          actions[actions.length - 1].active = true
        }

        this.setState({ actions })
      }

    }
  }
  
  handleOnChange(e) {
    const message = e.target.value
    let actions = []

    // Are they typing a command?
    if (message.charAt(0) === '/') {
      actions = actionsList.filter(action => {
        // Since we're resuing the same array we need to reset the 
        // active key. We could also create a new object to not
        // copy by reference, but that seems expensive.
        action.active = false;
        return action.action.lastIndexOf(message) >= 0 // This is where we match the commands
      })

      // Set the first action in the returned list as 
      // the active command
      if (actions.length > 0 ) {
        actions[0].active = true
      }
    }

    // Update input text
    this.setState({ currentMessage: e.target.value })  
    this.setState({ actions })
  }
  
  render() {    
    const { actions, currentMessage } = this.state
    
    return (
      <div className="chat-box-container">

        <ActionsBox 
          actions={actions}
          currentMessage={currentMessage}
        />

        <ChatBox
          handleOnChange={this.handleOnChange}
          currentMessage={currentMessage}
        />

      </div>
    )
  }
}

export default ChatBoxContainer
