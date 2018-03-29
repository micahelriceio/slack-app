import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ActionsBox extends Component {
  render() {
    const { actions, currentMessage } = this.props
    
    let ActionsBoxClass = classNames({
      'actions-container': true,
      'active': actions.length > 0
    })

    let firstActionsCommand = (active) => classNames({
      'actions-command': true,
      'active': active
    })
    
    return (
      <div className={ActionsBoxClass}>
        <div className="actions-header">
          <div>
            <p>Commands Matching "{currentMessage}"</p>
          </div>
          <div>
            <p className="spaced"><span>tab</span> or <span>&uarr;</span> <span>&darr;</span> to navigate</p>
            <p className="spaced"><span>&#8626;</span> to select</p>
            <p className="spaced"><span>esc</span> to dismis</p>
          </div>
        </div>
        <div className="actions-body">
          {actions.map((action, index)  => {
            return (
              <div key={action.action} className={firstActionsCommand(action.active)}>
                <p className="action">{action.action}<span>{action.actiondHelp}</span></p>
                <p className="action-description">{action.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

ActionsBox.propTypes = {
  actions: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired
}

export default ActionsBox
