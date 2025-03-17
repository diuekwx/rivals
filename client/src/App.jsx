import { useState, useRef } from 'react'

import './App.css'
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex flex-col">

        <Navbar />
        <Outlet />
      </div>

    </>
  )
}

export default App
