import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NodeUserList from './components/UserList/UserList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NodeUserList/>
    </>
  )
}

export default App
