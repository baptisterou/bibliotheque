import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import FilterBar from './FilterBar';


function Header({books, onGenreChange, onYearChange, onInputChange, genre, year, input}) {
  const [isDisplayed, setIsDisplayed] = useState(false);


  function toggleFiltres(){
    setIsDisplayed(!isDisplayed)
  }
 

  return (
    <div className=''>
      <div className='text-white py-5' style={{backgroundColor : '#3b5998'}}>
        <h1 className='mb-3 ms-5'>Bibliothèque</h1>
        <nav className='d-flex list-unstyled '>
          <NavLink to='/' className='mx-5 mb-3 fw-bold text-reset text-decoration-none'>Accueil</NavLink>
          <NavLink to='/addBook' className='fw-bold text-reset text-decoration-none'>Ajouter un livre</NavLink>
        </nav>
      </div>
      <div className='bg-light py-5'>
        <NavLink to='/addBook' className='btn btn-success mx-5' >Ajouter un livre</NavLink>
        <button className='btn btn-primary' onClick={toggleFiltres}>{isDisplayed ? "Masquer les filtres" :"Afficher les filtres"}</button>
      </div>
      {isDisplayed ? <FilterBar books={books} onGenreChange={onGenreChange} onYearChange={onYearChange} onInputChange={onInputChange} genre={genre} year={year} input={input}/> : null}
    </div>
  )
}

export default Header