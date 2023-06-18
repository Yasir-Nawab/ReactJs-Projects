import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
  const a = useContext(noteContext);
  return (
    <div>
      This is About page {a.name}
    </div>
  )
}

export default About
