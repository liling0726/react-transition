import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './cssTransition.less'
export default class CSSTransitionItem extends React.Component {
  state = {
    showImg:false
  }
  handleToggle=()=>{
    this.setState(state => ({
      showImg: !state.showImg,
    }))
};
  render() {
   return <div>
      <button onClick={this.handleToggle}>切换</button>
      <CSSTransition  classNames="img"
      in={this.state.showBox}
        onEnter={() => {
          this.boxDOM.style.display = 'block'
        }}
        onExited={() => {
          this.boxDOM.style.display = 'none'
        }}
        timeout={300}
      >
        <div className="box"
        ref="box">
          <h1>测试动画效果滴。</h1>
          <div className="color-box">哈哈哈</div>
        </div>
      </CSSTransition>
    </div>
  }
}
