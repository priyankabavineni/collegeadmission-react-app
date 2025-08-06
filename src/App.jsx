import "bootstrap/dist/css/bootstrap.min.css"

import { useState } from 'react'

import './App.css'
import Student from './student/Student'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Student> </Student>
      </div>


    </>
  )
}

export default App
