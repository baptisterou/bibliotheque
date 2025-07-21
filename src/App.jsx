import React from 'react'
import './App.css'
import Header from './components/Header'
import EditBook from './pages/EditBook'
import BookCard from './components/BookCard'
import { Route, Routes } from 'react-router-dom'
import AddBook from './pages/AddBook'
import BookList from './pages/BookList'
import FilterBar from './components/FilterBar'

function App() {

  return (
    <div className='bg-light'>
      <Header className='mt-0'></Header>
      <FilterBar/>
      <Routes>
        <Route path='/'element={<BookList />}/>
        <Route path='/addBook' element={<AddBook />}/>
        <Route path='*' element={<BookList/>}/>
        <Route path='/edit' element={<EditBook/>}/>
      </Routes>
    </div>
  )
}

export default App
