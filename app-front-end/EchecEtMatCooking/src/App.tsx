import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <header><Navbar /></header>
      <main className="container bg-dark text-light rounded mt-2 mb-2 p-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
