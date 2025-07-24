// Imports de tous les composants et hooks nécessaires
import React from 'react'
import './App.css'
import Header from './components/Header'
import EditBook from './pages/EditBook'
import BookCard from './components/BookCard'
import { Route, Routes } from 'react-router-dom'
import AddBook from './pages/AddBook'
import BookList from './pages/BookList'
import FilterBar from './components/FilterBar'
import { useState, useEffect, useCallback } from 'react'
import { useTheme } from './contexts/ThemeContext'

// Composant principal de l'application
function App() {
  // Récupération du thème depuis le contexte
  const { isDarkMode } = useTheme();

  // États pour gérer tous les filtres
  const[genre, setSelectedGenre] = useState('')
  const[year, setSelectedYear] = useState('');
  const[input, setInput] = useState('')
  const[isFavoriFilter, setIsFavoriFilter] = useState(false)
  const[statutLectureFilter, setStatutLectureFilter] = useState('')

  // Fonctions callback pour éviter les re-rendus inutiles
  const onGenreChange = useCallback((genreCB) => {
    setSelectedGenre(genreCB)
  }, []);

  const onYearChange = useCallback((yearCB) => {
    setSelectedYear(yearCB);
  }, []);

  const onInputChange = useCallback((inputCB) => {
    setInput(inputCB)
  }, []);

  const onFavoriFilterChange = useCallback((favoriCB) => {
    setIsFavoriFilter(favoriCB)
  }, []);

  const onStatutLectureChange = useCallback((statutLectureCB) => {
    setStatutLectureFilter(statutLectureCB)
  }, []);

  // Fonction pour basculer les favoris avec mise à jour optimiste
  const toggleFavori = useCallback((idBook) => {
    // Mise à jour optimiste locale sans re-render - utilise useCallback pour stabilité
    setBooks(prevBooks => {
      const bookToUpdate = prevBooks.find(book => book.id === idBook);
      if (bookToUpdate) {
        const updatedBook = { ...bookToUpdate, isFavori: !bookToUpdate.isFavori };
        
        // Mise à jour en arrière-plan sur le serveur
        fetch(`http://localhost:3001/books/${idBook}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBook)
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour des favoris:', error);
          // En cas d'erreur, annuler la mise à jour optimiste
          setBooks(prevBooksRollback => 
            prevBooksRollback.map(book => 
              book.id === idBook ? { ...book, isFavori: !book.isFavori } : book
            )
          );
        });
      }
      
      return prevBooks.map(book => 
        book.id === idBook ? { ...book, isFavori: !book.isFavori } : book
      );
    });
  }, []);

  // Fonction pour changer le statut de lecture
  const toggleStatutLecture = useCallback((idBook) => {
    setBooks(prevBooks => {
      const bookToUpdate = prevBooks.find(book => book.id === idBook);
      if (bookToUpdate) {
        // Cycle entre les statuts : non-lu -> en-cours -> lu -> non-lu
        let newStatut;
        switch(bookToUpdate.statutLecture) {
          case 'non-lu':
            newStatut = 'en-cours';
            break;
          case 'en-cours':
            newStatut = 'lu';
            break;
          case 'lu':
          default:
            newStatut = 'non-lu';
            break;
        }
        
        const updatedBook = { ...bookToUpdate, statutLecture: newStatut };
        
        // Mise à jour en arrière-plan sur le serveur
        fetch(`http://localhost:3001/books/${idBook}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBook)
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du statut de lecture:', error);
          // En cas d'erreur, annuler la mise à jour optimiste
          setBooks(prevBooksRollback => 
            prevBooksRollback.map(book => 
              book.id === idBook ? { ...book, statutLecture: bookToUpdate.statutLecture } : book
            )
          );
        });
        
        return prevBooks.map(book => 
          book.id === idBook ? { ...book, statutLecture: newStatut } : book
        );
      }
      return prevBooks;
    });
  }, []);

  // Fonction pour supprimer un livre avec confirmation
  const deleteEntry = useCallback((idBook) => {
      if(window.confirm('Voulez vous vraiment supprimer ce livre? ATTENTION CETTE OPERATION EST IRREVERSIBLE')){
        fetch(`http://localhost:3001/books/${idBook}`, {
          method: 'DELETE'
        })
      .then(()=>{
        setBooks(prevBooks => prevBooks.filter(book => book.id !== idBook))
      })
      }
  }, []);

  // Fonction pour mettre à jour un livre existant
  const updateBook = useCallback((idBook, updatedBook) => {
    fetch(`http://localhost:3001/books/${idBook}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })
    .then(response => response.json())
    .then(updatedBookData => {
      setBooks(prevBooks => prevBooks.map(book => 
        book.id === idBook ? updatedBookData : book
      ));
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour:', error);
    });
  }, []);
  
  // Fonction pour ajouter un nouveau livre
  const newBook = useCallback((book) => {
        fetch(`http://localhost:3001/books/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(newBookData => {
      setBooks(prevBooks => [...prevBooks, newBookData]);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout:', error);
    });
  }, []);

  // État pour stocker tous les livres
  const [books, setBooks] = useState([]);

  // Effet pour charger les livres au démarrage de l'app
  useEffect(()=>{
    fetch('http://localhost:3001/books')
    .then(response => response.json())
    .then(data => setBooks(data))
  },[])

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{minHeight: '100vh'}}>
      {/* Header avec navigation et filtres */}
      <Header className='mt-0 ' books={books} onGenreChange={onGenreChange} onYearChange={onYearChange} onInputChange={onInputChange} onFavoriFilterChange={onFavoriFilterChange} onStatutLectureChange={onStatutLectureChange} genre={genre} year={year} input={input} isFavoriFilter={isFavoriFilter} statutLectureFilter={statutLectureFilter}></Header>
      {/* Routes pour naviguer entre les pages */}
      <Routes>
        <Route className='' path='/' element={<BookList  books={books} genre={genre} year={year} input={input} isFavoriFilter={isFavoriFilter} statutLectureFilter={statutLectureFilter} deleteEntry={deleteEntry} toggleFavori={toggleFavori} toggleStatutLecture={toggleStatutLecture}/>}/>
        <Route className='' path='/addBook' element={<AddBook newBook={newBook}/>}/>
        <Route className='' path='/edit/:id' element={<EditBook books={books} updateBook={updateBook}/>}/>
      </Routes>
    </div>
  )
}

export default App
