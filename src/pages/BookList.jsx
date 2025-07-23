import React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import BookCard from '../components/BookCard'

function BookList({books, genre, year, input, isFavoriFilter, deleteEntry, editEntry, toggleFavori}) {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  // ...
  const prevFilters = useRef({ genre, year, input, isFavoriFilter });
  const { totalBooks, totalPages, currentBooks, indexOfFirstBook, indexOfLastBook } = useMemo(() => {
    const filteredBooks = genre ? books.filter(book => book.genre === genre) : books;
    const filteredYear = year ? filteredBooks.filter(book => book.date.substring(0,4) === year) : filteredBooks;
    const filteredInput = input ? filteredYear.filter(book => 
      book.resume.toLowerCase().includes(input.toLowerCase()) || 
      book.titre.toLowerCase().includes(input.toLowerCase()) || 
      book.auteur.toLowerCase().includes(input.toLowerCase())
    ) : filteredYear;
    const result = isFavoriFilter ? filteredInput.filter(book => book.isFavori === true) : filteredInput;

    const totalBooks = result.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = result.slice(indexOfFirstBook, indexOfLastBook);
    
    return { totalBooks, totalPages, currentBooks, indexOfFirstBook, indexOfLastBook };
  }, [books, genre, year, input, isFavoriFilter, currentPage, booksPerPage]);


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    const currentFilters = { genre, year, input, isFavoriFilter };
    const hasFilterChanged = Object.keys(currentFilters).some(
      key => currentFilters[key] !== prevFilters.current[key]
    );
    
    if (hasFilterChanged) {
      setCurrentPage(1);
      prevFilters.current = currentFilters;
    }
  }, [genre, year, input, isFavoriFilter]);


  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  return (
    <div>
      <div className='d-flex flex-wrap row'>
        {currentBooks.map((book) => 
          <BookCard 
            key={book.id} 
            id={book.id} 
            titre={book.titre} 
            src={book.couverture.includes('http') ? book.couverture : `../../public/images/${book.couverture}`} 
            genre={book.genre} 
            auteur={book.auteur} 
            date={book.date} 
            resume={book.resume} 
            isFavori={book.isFavori || false}
            deleteEntry={deleteEntry} 
            editEntry={editEntry}
            toggleFavori={toggleFavori}
          />
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 mb-3">
          <nav aria-label="Navigation de pagination">
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                  Précédent
                </button>
              </li>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      <div className="text-center text-muted mb-3">
        Affichage de {indexOfFirstBook + 1} à {Math.min(indexOfLastBook, totalBooks)} sur {totalBooks} livre(s)
      </div>
    </div>
  )
}

export default BookList