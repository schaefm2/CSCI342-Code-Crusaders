import { useState } from 'react'
import './App.css'
import Search from './Search'


function App() {
  const [count, setCount] = useState(0)

  const roles = [
    "Lead Front End: Max",
    "Back End: Aidan and Elijah",
    "UI/UX: Henry",
    "Database Management: Andrew",
    "Project Management: Everyone"
  ]

  return (
    <>
      <Search />
      <h1>CODE CRUSADERS!</h1>
      <div>
        <h2>ROLES</h2>
        {
          roles.map((role, index) => (
            <p key={index}>{role}</p>
          ))
        }
      </div>
    </>
  )
}

export default App
