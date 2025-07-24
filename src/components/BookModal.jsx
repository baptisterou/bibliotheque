import React from 'react';

const BookModal = ({ book, isOpen, onClose, onEdit, onDelete, onToggleFavorite, onToggleStatutLecture }) => {
  if (!isOpen || !book) return null;

  // Debug pour vérifier le statut de favori
  console.log('BookModal - book.isFavori:', book.isFavori, 'Type:', typeof book.isFavori);
  console.log('BookModal - onToggleFavorite function:', onToggleFavorite);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // S'assurer que isFavori est un booléen
  const isFavorite = Boolean(book.isFavori);

  const handleFavoriteClick = () => {
    console.log('Favorite star clicked for book:', book.id);
    console.log('Current favorite status:', book.isFavori);
    if (onToggleFavorite) {
      onToggleFavorite(book.id);
    } else {
      console.error('onToggleFavorite function is not provided');
    }
  };

  // Fonction pour obtenir l'icône et la couleur selon le statut de lecture
  const getStatutDisplay = (statut) => {
    switch(statut) {
      case 'lu':
        return { icon: '✓', color: '#28a745', text: 'Lu' };
      case 'en-cours':
        return { icon: '📖', color: '#ffc107', text: 'En cours' };
      case 'non-lu':
      default:
        return { icon: '📚', color: '#dba0a0ff', text: 'Non lu' };
    }
  };

  const statutDisplay = getStatutDisplay(book.statutLecture || 'non-lu');

  const handleStatutLectureClick = () => {
    console.log('Reading status clicked for book:', book.id);
    console.log('Current reading status:', book.statutLecture);
    if (onToggleStatutLecture) {
      onToggleStatutLecture(book.id);
    } else {
      console.error('onToggleStatutLecture function is not provided');
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button 
            className="modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>
          
          {/* Bouton de statut de lecture - à gauche */}
          <button
            className="modal-reading-status"
            onClick={handleStatutLectureClick}
            title={`Statut: ${statutDisplay.text}`}
            aria-label={`Changer le statut de lecture: ${statutDisplay.text}`}
            style={{
              backgroundColor: statutDisplay.color,
              color: 'white',
              position: 'absolute',
              left: '1rem',
              top: '1rem',
              width: '2.5rem',
              height: '2.5rem',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {statutDisplay.icon}
          </button>
          
          {/* Bouton favori - à droite */}
          <button
            className={`modal-favorite-star ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <span className="icon">{isFavorite ? '★' : '☆'}</span>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="flex flex-col items-center mb-2">
            {book.couverture && (
              <img 
                src={book.couverture.startsWith('http') ? book.couverture : `/images/${book.couverture}`}
                alt={book.titre}
                className="modal-book-image"
              />
            )}
            
            <h2 className="modal-book-title text-center">{book.titre}</h2>
            
            <div className="modal-book-meta">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-semibold text-sm text-secondary">Auteur:</span>
                  <span className="ms-2">{book.auteur}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-sm text-secondary">Genre:</span>
                  <span className="ms-2 book-genre">{book.genre}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-sm text-secondary">Date:</span>
                  <span className="ms-2 book-date">{formatDate(book.date)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6 px-3">
            <h3 className="font-semibold mb-4 text-lg">Résumé</h3>
            <p className="modal-book-resume">{book.resume}</p>
          </div>
          
          <div className="modal-actions p-3">
            <button 
              onClick={() => {
                onEdit(book.id);
                onClose();
              }}
              className="btn btn-primary"
            >
              ✏️ Modifier
            </button>
            <button 
              onClick={() => {
                if (window.confirm('Voulez-vous vraiment supprimer ce livre ?')) {
                  onDelete(book.id);
                  onClose();
                }
              }}
              className="btn btn-danger"
            >
              🗑️ Supprimer
            </button>
            <button 
              onClick={onClose}
              className="btn btn-secondary"
            >
              ✕ Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
