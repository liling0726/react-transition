import React from 'react'
import { Transition } from 'react-transition-group'

const duration = 1000
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: .5 },
  entered: { opacity: 1 },
}
export default class TransitionItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      isEnter: true,
      isExit: false
    }
  }
  componentDidMount() {

  }
  handleToogle = () => {
    this.setState(state => ({
      show: !state.show,
    }))
  }
  getTransitionEnd = (node, done) => {
    console.log('getTransitionEnd')
  }
  handleEnter = (node, isAppearing) => {
    console.log('enter')
  }
  handleEntering = (node, isAppearing) => {
    console.log('entering')
  }
  handleEntered = (node, isAppearing) => {
    console.log('entered')
  }
  handleExit = (node) => {
    console.log('exit')
  }
  handleExiting = (node) => {
    console.log('exiting')
  }
  handleExited = (node) => {
    console.log('exit')
  }
  render() {
    const { show, isEnter, isExit } = this.state
    return (<div className="App" >
      <button onClick={this.handleToogle}>
        Toggle
        </button>
      <Transition
        addEndListener={this.getTransitionEnd}
        /* appear={true} */
        /* enter={isEnter} */
        /* exit={isExit} */
        in={show}
        onEnter={this.handleEnter}
        onEntered={this.handleEnted}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        onExited={this.handleExited}
        onExiting={this.handleExiting}
        timeout={duration}

      /* mountOnEnter={true}
      unmountOnExit={true} */
      >
        {(state) => {
          let text = ''
          switch (state) {
            case 'entering':
              text = 'Entering…'
              break
            case 'entered':
              text = 'Entered...'
              break
            case 'exiting':
              text = 'exiting...'
              break
            case 'exited':
              text = 'exited...'
              break
          }
          console.log('当前transition周期', text)
          return <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            当前transition生命周期为 {text}
          </div>
        }
        }
      </Transition>
    </div>
    )
  }
}

