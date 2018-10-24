
/**
 * 程序的入口
 */
// import 'babel-polyfill' //es6
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
//页面
import Index from '@/routes/Index'
import TransitionItem from '@/components/transition'
import CSSTransitionItem from '@/components/cssTransition'
import TransitionGroupItem from '@/components/transitionGroup'
import './transition.less'
class App extends React.Component {
  render() {
    return (
      <TransitionGroup
        className="transition-wrapper"
        style={{ position: 'relative', width: '100%' }}
        >
        < CSSTransition
          classNames="page-transition-item"
          key={this.props.location.pathname}
          timeout={1000}
        >
          <div key={this.props.location.pathname}
            style={{ position: 'absolute', width: '100%' }}>
            {
              this.props.children
            }
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}
const routes = (
  <Router history={hashHistory}>
    <Route component={App}
      path="/"
    >
      <IndexRoute component={Index}
      />
      <Route component={TransitionItem}
        path="transition"
      />
      <Route component={CSSTransitionItem}
        path="cssTransition"
      />
      <Route component={TransitionGroupItem}
        path="transitionGroup"
      />
    </Route>

    {/* <Route component={ChatTest}
     onEnter={trackLog.pageLog('list','ChatTest')}
      path="/chattest"
    /> */}

  </Router>
)
ReactDOM.render(routes, document.getElementById('root'))

