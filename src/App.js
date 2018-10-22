import React, {
  Component
} from 'react';

import {
  Transition
} from 'react-transition-group'
import './App.css';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }
  componentDidMount(){
    this.setState({
      show:true
    })
  }
  render() {
    const { show }  = this.state
    return ( <div className = "App" >
    <button
          onClick={() => {
            this.setState(state => ({
              show: !state.show,
            }));
          }}
        >
          Toggle
        </button>
        <Transition in={show} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm a fade Transition!
      </div>
    )}
  </Transition>
       </div>
    );
  }
}

export default App;