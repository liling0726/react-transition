import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './transitionGroup.less'
export default class TransitionGroupItem extends React.Component {
  state = {
    items: [
      { id: 1, url: '../assets/img/1.jpg' },
      { id: 2, url: '../assets/img/2.jpg' },
      { id: 3, url: '../assets/img/3.jpg' },
      { id: 4, url: '../assets/img/4.jpg' },
    ],
    currentIndex: 0
  }
  /**
	 * 组件加载完毕后，图片自动播放
	 */
  componentDidMount() {
    this.timer = setInterval(
      () => {
        this.setState({
          currentIndex: (this.state.currentIndex + 1) % 4
        })
      },
      2000
    )
  }
	/**
	 * 组件卸载时，清理定时器
	 */
  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }
  handlechildFactory(node) {
    console.log(node, 'handlechildFactory')
    return <div>{node}</div>
  }
  render() {
    const { items, currentIndex } = this.state
    const { id, url } = items[currentIndex]
    return <div className="carousel-wrap">
      <ul className="carousel">
        <TransitionGroup
          className="carousel-image"
          component="li"
        /* childFactory ={this.handlechildFactory} */
        >
          < CSSTransition
            classNames="carousel-image-item"
            key={id}
            timeout={1000}
          >
            <img
              src={url}
            />
          </CSSTransition>
        </TransitionGroup>
      </ul>
    </div>
  }
}
