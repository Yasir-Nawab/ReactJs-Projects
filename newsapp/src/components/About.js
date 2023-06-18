import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class About extends Component {
  render() {
    return (
      <div>
        <h1>This is About page</h1>
        <li className="nav-item"><Link className="nav-link active text-dark" aria-current="page" to="/">Home</Link></li>
      </div>
    )
  }
}

export default About
