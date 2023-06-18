import './App.css';
import React, { Component } from 'react'

// Importing context
import NoteState from './context/notes/noteState';


// Importing components
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';



// React router dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/about",
        element: <About/>
      }   
    ]
  }
]);



export default class App extends Component {
  render() {
    return (
      <>
        <NoteState>
          <RouterProvider router={router}/>
        </NoteState>
      </>
    )
  }
}