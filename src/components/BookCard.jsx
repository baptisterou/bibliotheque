// Imports nécessaires
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

// Composant carte de livre moderne - memo pour éviter les re-rendus inutiles
const BookCard = memo(function BookCard({
  titre, 
  auteur, 
  genre, 
  date, 
  resume, 
  src, 
  id, 
  isFavori, 
  deleteEntry, 
  toggleFavori,
  onClick
}) {

  // Fonction pour supprimer le livre
  function handleDelete(e) {
    e.stopPropagation();
    deleteEntry(id);
  }

  // Fonction pour ajouter/enlever des favoris
  function handleFavori(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavori(id);
  }

  // Fonction pour gérer le clic sur la carte
  function handleCardClick() {
    onClick?.({ id, titre, auteur, genre, date, resume, couverture: src, isFavori });
  }

  // Fonction pour mettre la date au bon format français
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className='col-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column'>
      <div className="book-card slide-up" onClick={handleCardClick}>
        {/* Bouton favori */}
        <button 
          className={`favorite-btn ${isFavori ? 'active' : ''}`}
          onClick={handleFavori}
          title={isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <span className="icon">{isFavori ? '★' : '☆'}</span>
        </button>
        
        {/* Image de couverture */}
        {src && (
          <img 
            src={src.startsWith('http') ? src : `/images/${src}`}
            className="book-image" 
            alt={titre}
          />
        )}
        
        {/* Contenu de la carte */}
        <div className="flex flex-col" style={{ flex: 1 }}>
          <h5 className="book-title">{titre}</h5>
          <div className="book-author">{auteur}</div>
          <div className="book-genre">{genre}</div>
          <div className="book-date">{formatDate(date)}</div>
          
          {/* Résumé avec ellipsis */}
          <p className="book-resume">{resume}</p>
          
          {/* Boutons d'action */}
          <div className='book-actions'>
            <Link 
              to={`/edit/${id}`} 
              className='btn btn-primary'
              onClick={(e) => e.stopPropagation()}
            >
              ✏️ Modifier
            </Link>
            <button 
              className='btn btn-danger' 
              onClick={handleDelete}
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
});

export default BookCard

