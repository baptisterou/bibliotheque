// Imports des dépendances nécessaires
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import FilterBar from './FilterBar';
import ThemeToggle from './ThemeToggle';

// Composant Header qui affiche la navigation et les filtres
function Header({books, onGenreChange, onYearChange, onInputChange, onFavoriFilterChange, genre, year, input, isFavoriFilter}) {
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
              <h1 className="header-title">Ma Bibliothèque Personnelle</h1>
              {/* Menu de navigation */}
              <nav className="header-nav">
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
              <span className="btn-icon">+</span>
              Ajouter un livre
            </NavLink>
            {/* Bouton pour afficher/masquer les filtres */}
            <button className='btn btn-secondary' onClick={toggleFiltres}>
              <span className="btn-icon">⚙</span>
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
            genre={genre} 
            year={year} 
            input={input} 
            isFavoriFilter={isFavoriFilter}
          />
        </div>
      )}
    </header>
  )
}

export default Header