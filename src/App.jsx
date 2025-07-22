import React from 'react'
import './App.css'
import Header from './components/Header'
import EditBook from './pages/EditBook'
import BookCard from './components/BookCard'
import { Route, Routes } from 'react-router-dom'
import AddBook from './pages/AddBook'
import BookList from './pages/BookList'
import FilterBar from './components/FilterBar'
import { useState, useEffect } from 'react'

function App() {

  const[genre, setSelectedGenre] = useState('')
  const[year, setSelectedYear] = useState('');
  const[input, setInput] = useState('')

  function onGenreChange(genreCB){
    setSelectedGenre(genreCB)
  }

  function onYearChange(yearCB){
    setSelectedYear(yearCB);
  }

  function onInputChange(inputCB){
    setInput(inputCB)
  }

  function deleteEntry(idBook){
      if(window.confirm('Voulez vous vraiment supprimer ce livre? ATTENTION CETTE OPERATION EST IRREVERSIBLE')){
        fetch(`http://localhost:3001/books/${idBook}`, {
          method: 'DELETE'
        })
      .then(()=>{
        setBooks(books.filter(book => book.id !== idBook))
      })
      }
  }

  function updateBook(idBook, updatedBook){
    fetch(`http://localhost:3001/books/${idBook}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })
    .then(response => response.json())
    .then(updatedBookData => {
      setBooks(books.map(book => 
        book.id === idBook ? updatedBookData : book
      ));
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour:', error);
    });
  }
// fetch ajout nouveau livre
  function newBook(book){
        fetch(`http://localhost:3001/books/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(newBookData => {
      setBooks([...books, newBookData]);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout:', error);
    });
  }


  const [books, setBooks] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/books')
    .then(response => response.json())
    .then(data => setBooks(data))
  },[])

  return (
    <div className='bg-light'>
      <Header className='mt-0' books={books} onGenreChange={onGenreChange} onYearChange={onYearChange} onInputChange={onInputChange} genre={genre} year={year} input={input}></Header>
      <Routes>
        <Route path='/' element={<BookList  books={books} genre={genre} year={year} input={input} deleteEntry={deleteEntry}/>}/>
        <Route path='/addBook' element={<AddBook newBook={newBook}/>}/>
        <Route path='/edit/:id' element={<EditBook books={books} updateBook={updateBook}/>}/>
      </Routes>
    </div>
  )
}

export default App
