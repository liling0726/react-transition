import React from 'react'
import { Link } from 'react-router'

export default class Index extends React.Component{
    render(){
        return <div>
            <ul>
                <li><Link to="/transition">transition</Link></li>
                <li><Link to="/cssTransition">CSStransition</Link></li>
                <li><Link to="/transitionGroup">transitionGroup</Link></li>
            </ul>
        </div>
    }
}