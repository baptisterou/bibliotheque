import React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'

function BookList({books, genre, year, input, isFavoriFilter, deleteEntry, toggleFavori}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('titre-asc'); // État pour le tri
  const navigate = useNavigate();
  const booksPerPage = 8;
  
  const prevFilters = useRef({ genre, year, input, isFavoriFilter });
  // Fonctions pour gérer le modal
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleEditBook = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  // Fonction pour gérer le changement de tri
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Retour à la première page lors du changement de tri
  };

  // Fonction pour trier les livres
  const sortBooks = (books, sortOption) => {
    const sortedBooks = [...books];
    
    switch (sortOption) {
      case 'titre-asc':
        return sortedBooks.sort((a, b) => a.titre.localeCompare(b.titre));
      case 'titre-desc':
        return sortedBooks.sort((a, b) => b.titre.localeCompare(a.titre));
      case 'date-asc':
        return sortedBooks.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'date-desc':
        return sortedBooks.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return sortedBooks;
    }
  };

  const { totalBooks, totalPages, currentBooks, indexOfFirstBook, indexOfLastBook } = useMemo(() => {
    const filteredBooks = genre ? books.filter(book => book.genre === genre) : books;
    const filteredYear = year ? filteredBooks.filter(book => book.date.substring(0,4) === year) : filteredBooks;
    const filteredInput = input ? filteredYear.filter(book => 
      book.resume.toLowerCase().includes(input.toLowerCase()) || 
      book.titre.toLowerCase().includes(input.toLowerCase()) || 
      book.auteur.toLowerCase().includes(input.toLowerCase())
    ) : filteredYear;
    const filteredFavori = isFavoriFilter ? filteredInput.filter(book => book.isFavori === true) : filteredInput;
    
    // Application du tri
    const sortedBooks = sortBooks(filteredFavori, sortOption);

    const totalBooks = sortedBooks.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
    
    return { totalBooks, totalPages, currentBooks, indexOfFirstBook, indexOfLastBook };
  }, [books, genre, year, input, isFavoriFilter, currentPage, booksPerPage, sortOption]);


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
    <div className="container mt-8">
      {/* Message si aucun livre */}
      {currentBooks.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📚</div>
          <div className="title">Aucun livre trouvé</div>
          <div className="description">
            {totalBooks === 0 
              ? "Votre bibliothèque est vide. Commencez par ajouter quelques livres !" 
              : "Aucun livre ne correspond à vos critères de recherche."}
          </div>
        </div>
      ) : (
        <>
          {/* Barre de tri */}
          <div className="sort-container mt-5">
            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">
                 Trier par :
              </label>
              <select 
                id="sort-select"
                value={sortOption} 
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="titre-asc">Titre (A → Z)</option>
                <option value="titre-desc">Titre (Z → A)</option>
                <option value="date-asc">Date (Anciens → Récents)</option>
                <option value="date-desc">Date (Récents → Anciens)</option>
              </select>
            </div>
          </div>

          {/* Grille des livres */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {currentBooks.map(book =>
              <BookCard 
                key={book.id}
                id={book.id}
                titre={book.titre} 
                src={book.couverture} 
                auteur={book.auteur} 
                genre={book.genre} 
                date={book.date} 
                resume={book.resume} 
                isFavori={book.isFavori || false}
                deleteEntry={deleteEntry} 
                toggleFavori={toggleFavori}
                onClick={handleBookClick}
              />
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={prevPage} 
                disabled={currentPage === 1}
              >
                ←
              </button>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <button 
                  key={index + 1} 
                  className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={nextPage} 
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          )}
          
          {/* Statistiques */}
          <div className="text-center text-sm text-tertiary mb-8">
            Affichage de <span className="font-medium">{indexOfFirstBook + 1}</span> à{' '}
            <span className="font-medium">{Math.min(indexOfLastBook, totalBooks)}</span> sur{' '}
            <span className="font-medium">{totalBooks}</span> livre(s)
          </div>
        </>
      )}
      
      {/* Modal pour afficher les détails du livre */}
      <BookModal
        book={selectedBook ? books.find(b => b.id === selectedBook.id) || selectedBook : null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditBook}
        onDelete={deleteEntry}
        onToggleFavorite={toggleFavori}
      />
    </div>
  )
}

export default BookList