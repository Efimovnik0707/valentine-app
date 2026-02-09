import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Create from './pages/Create'
import Demo from './pages/Demo'
import Valentine from './pages/Valentine'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/create" element={<Create />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/v/:id" element={<Valentine />} />
    </Routes>
  )
}

export default App
