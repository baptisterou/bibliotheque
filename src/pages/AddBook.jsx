// Imports nécessaires
import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Page pour ajouter un nouveau livre
function AddBook({ newBook }) {

// Pour naviguer vers une autre page après ajout
const navigate = useNavigate();
  
// États pour gérer les champs du formulaire
const[inputTitre, setTitre] = useState('');
const[inputAuteur, setAuteur] = useState('');
const[inputGenre, setGenre] = useState('');
const[inputDate, setDate] = useState('');
const[inputSrc, setSrc] = useState('');
const[inputResume, setResume] = useState('');

// États pour la suggestion de livres depuis Google Books API
const[suggestions, setSuggestions] = useState([]);
const[isLoading, setIsLoading] = useState(false);
const[showSuggestions, setShowSuggestions] = useState(false);

// Fermer les suggestions quand on clique ailleurs
useEffect(() => {
  function handleClickOutside(event) {
    if (!event.target.closest('.book-suggestions-container')) {
      setShowSuggestions(false);
    }
  }
  
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  // Fonctions pour mettre à jour les champs quand on tape dedans
  function handleTitre(e){
    const titre = e.target.value;
    setTitre(titre);
    
    // Si le titre fait plus de 2 caractères, on recherche des suggestions
    if (titre.length > 2) {
      searchBooks(titre);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  // Fonction pour rechercher des livres via Google Books API
  async function searchBooks(query) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&langRestrict=fr`
      );
      const data = await response.json();
      
      if (data.items) {
        const formattedSuggestions = data.items.map(item => {
          const volumeInfo = item.volumeInfo;
          
          // Debug: afficher les données reçues
          console.log('Données reçues pour:', volumeInfo.title);
          console.log('Description:', volumeInfo.description);
          console.log('SearchInfo:', item.searchInfo);
          
          // Formatage de la date pour le champ date HTML
          let formattedDate = '';
          if (volumeInfo.publishedDate) {
            const dateStr = volumeInfo.publishedDate;
            // Si on a une date complète (YYYY-MM-DD)
            if (dateStr.length >= 10) {
              formattedDate = dateStr.substring(0, 10);
            } 
            // Si on a seulement l'année (YYYY)
            else if (dateStr.length === 4) {
              formattedDate = `${dateStr}-01-01`;
            }
            // Si on a année-mois (YYYY-MM)
            else if (dateStr.length === 7) {
              formattedDate = `${dateStr}-01`;
            }
          }

          // Nettoyage du résumé - essayer plusieurs sources
          let cleanResume = '';
          
          // Essayer d'abord description
          if (volumeInfo.description) {
            cleanResume = volumeInfo.description;
          }
          // Essayer searchInfo.textSnippet en backup
          else if (item.searchInfo && item.searchInfo.textSnippet) {
            cleanResume = item.searchInfo.textSnippet;
          }
          // Essayer subtitle comme description alternative
          else if (volumeInfo.subtitle) {
            cleanResume = volumeInfo.subtitle;
          }

          // Nettoyage du HTML si on a trouvé quelque chose
          if (cleanResume) {
            cleanResume = cleanResume
              .replace(/<[^>]*>/g, '') // Enlever les balises HTML
              .replace(/&quot;/g, '"') // Remplacer les entités HTML
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&hellip;/g, '...')
              .replace(/&nbsp;/g, ' ')
              .trim();
          }
          
          return {
            id: item.id,
            titre: volumeInfo.title || '',
            auteur: volumeInfo.authors ? volumeInfo.authors.join(', ') : '',
            genre: volumeInfo.categories ? volumeInfo.categories[0] : '',
            date: formattedDate,
            couverture: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || '',
            resume: cleanResume
          };
        });
        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
    setIsLoading(false);
  }

  // Fonction pour sélectionner une suggestion
  function selectSuggestion(book) {
    console.log('Sélection du livre:', book);
    console.log('Titre:', book.titre);
    console.log('Auteur:', book.auteur);
    console.log('Genre:', book.genre);
    console.log('Date:', book.date);
    console.log('Couverture:', book.couverture);
    console.log('Résumé:', book.resume);
    
    setTitre(book.titre || '');
    setAuteur(book.auteur || '');
    setGenre(book.genre || '');
    setDate(book.date || '');
    setSrc(book.couverture || '');
    setResume(book.resume || '');
    setShowSuggestions(false);
    setSuggestions([]);
  }

  function handleAuteur(e){
    setAuteur(e.target.value)
  }

  function handleGenre(e){
    setGenre(e.target.value)
  }

  function handleDate(e){
    setDate(e.target.value)
  }

  function handleSrc(e){
    setSrc(e.target.value)
  }

  function handleResume(e){
    setResume(e.target.value)
  }

  // Fonction qui s'exécute quand on soumet le formulaire
  function handleSubmit(e) {
    e.preventDefault();
    
    // Vérification que tous les champs obligatoires sont remplis
    if (!inputTitre || !inputAuteur || !inputGenre || !inputDate || !inputResume) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    // Création de l'objet livre avec toutes les infos
    const addNewBook = {
      titre: inputTitre,
      auteur: inputAuteur,
      genre: inputGenre,
      date: inputDate,
      couverture: inputSrc,
      resume: inputResume,
      statutLecture: 'non-lu'
    };

    // Appel de la fonction pour ajouter le livre
    newBook(addNewBook);
    
    // Retour à la page d'accueil
    navigate('/');
  }


  return (
    <div className='book-form-container'>
      <div className='book-form-card'>
        {/* Formulaire pour ajouter un livre avec design technique */}
        <form onSubmit={handleSubmit}>
          <h2 className='book-form-title'>
            <span className="code-accent">✨</span> Ajouter un nouveau livre
          </h2>
          
          {/* Champ titre avec suggestions */}
          <div className='book-form-group'>
            <label htmlFor="titre" className='book-form-label'>
              📖 Titre <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <div className="book-suggestions-container">
              <input 
                type="text" 
                className='book-form-input' 
                name='Titre' 
                value={inputTitre} 
                onChange={handleTitre} 
                required
                placeholder="Commencez à taper le titre du livre..."
                autoComplete="off"
              />
              
              {/* Indicateur de chargement */}
              {isLoading && (
                <div className="loading-indicator">
                  <div className="loading-spinner"></div>
                  <span>Recherche en cours...</span>
                </div>
              )}
              
              {/* Liste des suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="book-suggestions-list">
                  {suggestions.map((book, index) => (
                    <div 
                      key={book.id || index} 
                      className="book-suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Empêche la fermeture prématurée
                        selectSuggestion(book);
                      }}
                    >
                      {book.couverture && (
                        <img 
                          src={book.couverture} 
                          alt={book.titre}
                          className="book-suggestion-image"
                        />
                      )}
                      <div className="book-suggestion-content">
                        <div className="book-suggestion-title">{book.titre}</div>
                        <div className="book-suggestion-meta">
                          {book.auteur} {book.date && `(${book.date.substring(0, 4)})`}
                        </div>
                        {book.genre && (
                          <div className="book-suggestion-genre">{book.genre}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="auteur" className='book-form-label'>
              ✍️ Auteur <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="text" 
              className='book-form-input' 
              name='auteur' 
              value={inputAuteur} 
              onChange={handleAuteur} 
              required
              placeholder="Nom de l'auteur"
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="genre" className='book-form-label'>
              🏷️ Genre <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="text" 
              className='book-form-input' 
              name='genre' 
              value={inputGenre} 
              onChange={handleGenre} 
              required
              placeholder="Genre littéraire"
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="datePublication" className='book-form-label'>
              📅 Date de publication <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="date" 
              className='book-form-input' 
              name="datePublication" 
              id="datePublication" 
              value={inputDate} 
              onChange={handleDate} 
              required
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="urlCover" className='book-form-label'>
              🖼️ URL de la couverture
            </label>
            <input 
              type="url" 
              className='book-form-input' 
              name="urlCover" 
              value={inputSrc} 
              onChange={handleSrc} 
              placeholder="https://exemple.com/couverture.jpg"
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="resume" className='book-form-label'>
              📝 Résumé <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <textarea 
              name="resume" 
              className='book-form-textarea' 
              value={inputResume} 
              onChange={handleResume} 
              required
              placeholder="Décrivez brièvement l'histoire du livre..."
            />
          </div>
          
          <button type="submit" className='book-form-submit'>
            💾 Enregistrer le livre
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBook