import { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>
    </>
  )
}

export default App
