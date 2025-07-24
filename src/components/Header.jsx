// Imports des dépendances nécessaires
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import FilterBar from './FilterBar';
import ThemeToggle from './ThemeToggle';

// Composant Header qui affiche la navigation et les filtres
function Header({books, onGenreChange, onYearChange, onInputChange, onFavoriFilterChange, onStatutLectureChange, genre, year, input, isFavoriFilter, statutLectureFilter}) {
  // État pour gérer l'affichage des filtres
  const [isDisplayed, setIsDisplayed] = useState(false);

  // Fonction pour afficher/masquer les filtres
  function toggleFiltres(){
    setIsDisplayed(!isDisplayed)
  }
 
  return (
    <header className="header">
      {/* Section principale du header avec navigation */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <div className="header-brand">
              {/* Titre de la bibliothèque */}
              <h1 className="header-title mt-3">Ma Bibliothèque Personnelle</h1>
              {/* Menu de navigation */}
              <nav className="header-nav mt-4">
                <NavLink 
                  to='/' 
                  className="nav-link"
                >
                  Accueil
                </NavLink>
                <NavLink 
                  to='/addBook' 
                  className="nav-link"
                >
                  Ajouter un livre
                </NavLink>
              </nav>
            </div>
            <div className="header-actions">
              {/* Bouton pour changer de thème */}
              <ThemeToggle/>            
            </div>
          </div>
        </div>
      </div>
      
      {/* Section avec boutons d'action */}
      <div className="header-toolbar">
        <div className="container">
          <div className="toolbar-content">
            {/* Bouton pour ajouter un livre */}
            <NavLink to='/addBook' className='btn btn-primary'>
            
              Ajouter un livre
            </NavLink>
            {/* Bouton pour afficher/masquer les filtres */}
            <button className='btn btn-secondary' onClick={toggleFiltres}>
            
              {isDisplayed ? "Masquer les filtres" :"Afficher les filtres"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Affichage conditionnel de la barre de filtres */}
      {isDisplayed && (
        <div className="header-filters">
          <FilterBar 
            books={books} 
            onGenreChange={onGenreChange} 
            onYearChange={onYearChange} 
            onInputChange={onInputChange} 
            onFavoriFilterChange={onFavoriFilterChange} 
            onStatutLectureChange={onStatutLectureChange}
            genre={genre} 
            year={year} 
            input={input} 
            isFavoriFilter={isFavoriFilter}
            statutLectureFilter={statutLectureFilter}
          />
        </div>
      )}
    </header>
  )
}

export default Header