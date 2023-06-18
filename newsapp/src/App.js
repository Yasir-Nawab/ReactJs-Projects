import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import Newscomponent from './components/Newscomponent';
// importing react Router
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children:[
    {
      path:"/",
      element: <Newscomponent key="general" catagory="general"/>
    },
    {
      path:"/business",
      element: <Newscomponent key="business" catagory="business"/>
    },
    {
      path:"/entertainment",
      element: <Newscomponent key="entertainment" catagory="entertainment"/>
    },
    {
      path:"/health",
      element: <Newscomponent key="health" catagory="health"/>
    },
    {
      path:"/science",
      element: <Newscomponent key="science" catagory="science"/>
    },
    {
      path:"/sports",
      element: <Newscomponent key="sports" catagory="sports"/>
    },
    {
      path:"/technology",
      element: <Newscomponent key="technology" catagory="technology"/>
    }    
  ]
  }
]);


export default class App extends Component {

  state = {
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
      <RouterProvider router={router}/>


        {/* <Navbar/> */}
        {/* <Newscomponent catagory="science"/> */}
      </>
    )
  }
}