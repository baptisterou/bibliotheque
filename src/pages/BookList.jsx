import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/books')
    .then(response => response.json())
    .then(data => setBooks(data))
  },[])

  

  return (
    <div className='d-flex flex-wrap'>
    {books.map((book) => 
        <BookCard titre = {book.titre} src={book.couverture.includes('http')?
           book.couverture :
            `../../public/images/${book.couverture}` } genre={book.genre} auteur={book.auteur} date={book.date} resume={book.resume}
        />
    )}
    </div>
  )
}

export default BookList