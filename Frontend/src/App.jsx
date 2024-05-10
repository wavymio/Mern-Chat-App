import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
    return (
      <div className='p-4 h-screen flex items-center justify-center'>
        <Home />
      </div>
    )
}

export default App
