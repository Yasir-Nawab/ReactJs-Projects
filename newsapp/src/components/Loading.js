import React, { Component } from 'react'
import Spinner from './Loading.gif.gif'

export class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Spinner} alt="Loading" />
      </div>
    )
  }
}

export default Loading
