import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBot from './chatbot/ChatBot'
import ChatPopup from './chatbot/ChatPopup'
import Main from './main/Main'
import AdminChat from './admin/AdminChat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Main></Main>
      <ChatPopup></ChatPopup>
      
    </div>
  )
}

export default App
