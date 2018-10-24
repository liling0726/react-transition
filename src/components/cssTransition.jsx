import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './cssTransition.less'
export default class CSSTransitionItem extends React.Component {
  state = {
    showImg: true
  }
  handleToggle = () => {
    this.setState(state => ({
      showImg: !state.showImg,
    }))
  };
  handleEnter = (node, isAppearing) => {
    this.time1=Date.now()
    // console.log('enter',this.time1)
  }
  handleEntering = (node, isAppearing) => {
    this.time2=Date.now()
    // console.log('entering',this.time2-this.time1)
  }
  handleEntered = (node, isAppearing) => {
    this.time3=Date.now()
    // console.log('entered',this.time3-this.time2,this.time3-this.time1)
  }
  handleExit = (node) => {
    this.time4=Date.now()
    // console.log('exit',this.time4-this.time3)
  }
  handleExiting = (node) => {
    this.time5=Date.now()
    // console.log('exiting',this.time5-this.time4)
  }
  handleExited = (node) => {
    this.time6=Date.now()
    // console.log('exited',this.time6-this.time5)
  }
  render() {
    return <div >
      <CSSTransition
      classNames="transition"
        in={this.state.showImg}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        onExited={this.handleExited}
        onExiting={this.handleExiting}
        timeout={1000}
      >
        {(state) => (
          <div className="img-wrap">
            <img src="../assets/img/1.jpg" />
          </div>
        )
        }
      </CSSTransition>
      <div className="toggle-btn-wrap">
        <button className="toggle-btn"
          onClick={this.handleToggle}>切换</button>
      </div>
    </div>
  }
}
