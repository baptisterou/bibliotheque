import React from 'react';
import BookCard from '../components/BookCard'

function BookList({books, genre, year, input, deleteEntry, editEntry}) {
  
  const filteredBooks = genre ? books.filter(book => book.genre === genre) : books;
  const filteredYear = year ? filteredBooks.filter(book => book.date.substring(0,4) === year) : filteredBooks;
  const result = input ? filteredYear.filter(book => 
    book.resume.toLowerCase().includes(input.toLowerCase()) || 
    book.titre.toLowerCase().includes(input.toLowerCase()) || 
    book.auteur.toLowerCase().includes(input.toLowerCase())
  ) : filteredYear;
  return (
    <div className='d-flex flex-wrap row'>
      {result.map((book) => 
        <BookCard key={book.id} id={book.id} titre = {book.titre} src={book.couverture.includes('http')?book.couverture :
            `../../public/images/${book.couverture}` } genre={book.genre} auteur={book.auteur} date={book.date} resume={book.resume} deleteEntry={deleteEntry} editEntry={editEntry}
        />
      )}
    </div>
  )
}

export default BookList