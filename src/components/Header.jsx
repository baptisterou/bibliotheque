// Imports des dépendances nécessaires
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import FilterBar from './FilterBar';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

// Composant Header qui affiche la navigation et les filtres
function Header({books, onGenreChange, onYearChange, onInputChange, onFavoriFilterChange, genre, year, input, isFavoriFilter}) {
  // État pour gérer l'affichage des filtres
  const [isDisplayed, setIsDisplayed] = useState(false);
  // Récupération du mode sombre depuis le contexte
  const { isDarkMode } = useTheme();

  // Fonction pour afficher/masquer les filtres
  function toggleFiltres(){
    setIsDisplayed(!isDisplayed)
  }
 
  return (
    <div className=''>
      {/* Section principale du header avec navigation */}
      <div 
        className='text-white py-5' 
        style={{
          backgroundColor: isDarkMode ? '#121212ff' : '#3b5998',
          borderBottom: isDarkMode ? '1px solid #121212ff' : 'none'
        }}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            {/* Titre de la bibliothèque */}
            <h1 className='mb-3 ms-5' style={{color: isDarkMode ? '#e0e0e0' : 'white'}}>Bibliothèque</h1>
            {/* Menu de navigation */}
            <nav className='d-flex list-unstyled '>
              <NavLink 
                to='/' 
                className='mx-5 mb-3 fw-bold text-decoration-none'
                style={{color: isDarkMode ? '#e0e0e0' : 'white'}}
              >
                Accueil
              </NavLink>
              <NavLink 
                to='/addBook' 
                className='fw-bold text-decoration-none'
                style={{color: isDarkMode ? '#e0e0e0' : 'white'}}
              >
                Ajouter un livre
              </NavLink>
            </nav>
          </div>
          <div className='me-5 d-flex'>
            {/* Bouton pour changer de thème */}
            <ThemeToggle/>            
          </div>
        </div>
      </div>
      {/* Section avec boutons d'action */}
      <div 
        className='py-5' 
        style={{
          backgroundColor: isDarkMode ? '#121212ff' : 'inherit',
          borderBottom: isDarkMode ? '1px solid #121212ff' : 'none'
        }}
      >
        {/* Bouton pour ajouter un livre */}
        <NavLink to='/addBook' className='btn btn-success mx-5' >Ajouter un livre</NavLink>
        {/* Bouton pour afficher/masquer les filtres */}
        <button className='btn btn-primary' onClick={toggleFiltres}>{isDisplayed ? "Masquer les filtres" :"Afficher les filtres"}</button>
      </div>
      {/* Affichage conditionnel de la barre de filtres */}
      {isDisplayed ? <FilterBar books={books} onGenreChange={onGenreChange} onYearChange={onYearChange} onInputChange={onInputChange} onFavoriFilterChange={onFavoriFilterChange} genre={genre} year={year} input={input} isFavoriFilter={isFavoriFilter}/> : null}
    </div>
  )
}

export default Header