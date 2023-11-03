import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { useAppDispatch } from './config/hooks'
import { getAllRecipes } from './components/recipeSlice'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  },[])

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
