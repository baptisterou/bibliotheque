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
    if (!event.target.closest('.position-relative')) {
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
    setTitre(book.titre);
    setAuteur(book.auteur);
    setGenre(book.genre);
    setDate(book.date);
    setSrc(book.couverture);
    setResume(book.resume);
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
      resume: inputResume
    };

    // Appel de la fonction pour ajouter le livre
    newBook(addNewBook);
    
    // Retour à la page d'accueil
    navigate('/');
  }


  return (
    <div className='d-flex flex-column col-12 align-items-center'>
      <div className='col-4 my-5'>
        {/* Formulaire pour ajouter un livre */}
        <form onSubmit={handleSubmit}>
        <h3>Ajouter un livre</h3>
        <div className='d-flex flex-column'>
          {/* Champs obligatoires marqués avec * */}
          <label htmlFor="titre">Titre *</label>
          <div className="position-relative">
            <input 
              type="text" 
              className='mb-3' 
              name='Titre' 
              value={inputTitre} 
              onChange={handleTitre} 
              required
              placeholder="Commencez à taper le titre du livre..."
              autoComplete="off"
            />
            
            {/* Indicateur de chargement */}
            {isLoading && (
              <div className="position-absolute" style={{top: '10px', right: '10px'}}>
                <small className="text-muted">Recherche...</small>
              </div>
            )}
            
            {/* Liste des suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div 
                className="position-absolute w-100 bg-white border rounded shadow-lg" 
                style={{top: '100%', zIndex: 1000, maxHeight: '300px', overflowY: 'auto'}}
              >
                {suggestions.map((book, index) => (
                  <div 
                    key={book.id || index} 
                    className="p-3 border-bottom suggestion-item"
                    onClick={() => selectSuggestion(book)}
                    style={{cursor: 'pointer'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <div className="d-flex">
                      {book.couverture && (
                        <img 
                          src={book.couverture} 
                          alt={book.titre}
                          className="me-3"
                          style={{width: '40px', height: '60px', objectFit: 'cover'}}
                        />
                      )}
                      <div>
                        <strong>{book.titre}</strong>
                        <br />
                        <small className="text-muted">
                          {book.auteur} {book.date && `(${book.date.substring(0, 4)})`}
                        </small>
                        {book.genre && (
                          <br />
                        )}
                        {book.genre && (
                          <small className="text-info">{book.genre}</small>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <label htmlFor="auteur">Auteur *</label>
          <input type="text" className='mb-3' name='auteur' value={inputAuteur} onChange={handleAuteur} required/>
          <label htmlFor="genre">Genre *</label>
          <input type="text" className='mb-3' name='genre' value={inputGenre} onChange={handleGenre} required/>
          <label htmlFor="datePublication">Date de publication *</label>
          <input type="date" className='mb-3' name="datePublication" id="datePublication" value={inputDate} onChange={handleDate} required/>
          {/* Champ optionnel pour l'image de couverture */}
          <label htmlFor="urlCover">Url de la couverture</label>
          <input type="url" className='mb-3' name="urlCover" value={inputSrc} onChange={handleSrc}/>
          <label htmlFor="resume">Résumé *</label>
          <textarea name="resume" className='mb-3' cols="30" rows="10" value={inputResume} onChange={handleResume} required></textarea>
          {/* Bouton pour sauvegarder */}
          <button type="submit" className='btn btn-success mx-5'>Enregistrer les modifications</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook