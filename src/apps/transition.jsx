
/**
 * 程序的入口
 */
// import 'babel-polyfill' //es6
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

//页面
import Index from '@/routes/Index'
import Transition  from '@/components/transition'
import CSSTransition  from '@/components/cssTransition'
import TransitionGroup  from '@/components/transitionGroup'
class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
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
      <Route component={Transition}
        path="transition"
      />
      <Route component={CSSTransition}
        path="cssTransition"
      />
      <Route component={TransitionGroup}
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

