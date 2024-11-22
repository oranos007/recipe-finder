import React from 'react'
import "./App.css"
import Menu from './pages/Menu/Menu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Category from './pages/Category/Category'
import Home from './pages/Home/Home'
import Meal from './pages/SingleMeal/Meal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='category/:category' element={<Category/>}/>
      <Route path='meal/:id' element={<Meal/>}/>
    </Routes>  
     <Footer/>
    </BrowserRouter>
  )
}

export default App