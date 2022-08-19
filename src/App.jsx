import { useState } from 'react'
import './App.css'
import { StatusDashboard } from './Pages/StatusDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>Factory Four Interview</h2>
      <StatusDashboard />
    </div>
  )
}

export default App
