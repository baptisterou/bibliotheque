// Import de React
import React from 'react'

// Composant barre de filtres pour rechercher et filtrer les livres
function FilterBar({books, onGenreChange, onYearChange, onInputChange, onFavoriFilterChange, genre, year, input, isFavoriFilter}) {
  
  // Filtrage des livres pour avoir les genres disponibles selon les autres filtres
  let filteredBooksForGenres = books;
  
  // Si on a filtré par année, on filtre aussi pour les genres
  if (year) {
    filteredBooksForGenres = filteredBooksForGenres.filter(book => book.date.substring(0,4) === year);
  }
  
  // Si on a une recherche, on filtre aussi pour les genres
  if (input) {
    filteredBooksForGenres = filteredBooksForGenres.filter(book => 
      book.titre.toLowerCase().includes(input.toLowerCase()) ||
      book.auteur.toLowerCase().includes(input.toLowerCase()) ||
      book.resume.toLowerCase().includes(input.toLowerCase())
    );
  }
  
  // Récupération des genres uniques disponibles
  const genresBooks = [... new Set(filteredBooksForGenres.map((book)=> book.genre))];
  
  // Même chose mais pour les années disponibles
  let filteredBooksForYears = books;
  
  // Si on a filtré par genre, on filtre aussi pour les années
  if (genre) {
    filteredBooksForYears = filteredBooksForYears.filter(book => book.genre === genre);
  }
  
  // Si on a une recherche, on filtre aussi pour les années
  if (input) {
    filteredBooksForYears = filteredBooksForYears.filter(book => 
      book.titre.toLowerCase().includes(input.toLowerCase()) ||
      book.auteur.toLowerCase().includes(input.toLowerCase()) ||
      book.resume.toLowerCase().includes(input.toLowerCase())
    );
  }
  
  // Récupération des années uniques disponibles
  const yearBooks = [... new Set(filteredBooksForYears.map((book) => book.date.substring(0,4)))];
  
  // Fonctions pour gérer les changements dans les filtres
  function handleGenreChange(e){
    onGenreChange(e.target.value);
  }

  function handleYearChange(e){
    onYearChange(e.target.value);
  }

  function handleInputChange(e){
    onInputChange(e.target.value);
  }

  function handleFavoriFilterChange(e){
    onFavoriFilterChange(e.target.checked);
  }

  // Fonction pour tout remettre à zéro
  function resetFilters(){
    onGenreChange('');
    onYearChange('');
    onInputChange('');
    onFavoriFilterChange(false);
  }
  
  return (
    <div className='d-flex justify-content-around flex-wrap'>
      {/* Champ de recherche textuelle */}
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="recherche">Recherche</label>
        <input type="text" name="recherche" value={input} onChange={handleInputChange}/>
      </div>
      {/* Sélecteur de genre */}
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="genre">Filtrer par genre</label>
        <select name="genre" value={genre} onChange={handleGenreChange}>
          <option value="">Tous les genres</option>
          {genresBooks.sort().map((genre)=>
          <option key={genre} value={genre}>{genre}</option>
          )}
        </select>
      </div>
      {/* Sélecteur d'année */}
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="annee">Filtrer par annee</label>
        <select name="annee" value={year} onChange={handleYearChange}>
          <option value="">Année</option>
          {yearBooks.sort().map((year)=>
          <option key={year} value={year}>{year}</option>
          )}
        </select>
      </div>
      {/* Checkbox pour les favoris uniquement */}
      <div className='d-flex flex-column align-items-center'>
        <label className='mb-3' htmlFor="favoris">Favoris uniquement</label>
        <div className="favorite-filter-container">
          <input 
            type="checkbox" 
            id="favoris" 
            name="favoris" 
            checked={isFavoriFilter}
            onChange={handleFavoriFilterChange}
            className="favorite-filter-checkbox"
          />
          <label htmlFor="favoris" className="favorite-filter-label">
            <span className="favorite-filter-star">⭐</span>
          </label>
        </div>
      </div>
      {/* Bouton pour tout remettre à zéro */}
      <div className='d-flex flex-column'>
        <div className='mb-3'></div>
        <button className="btn btn-secondary btn-sm fw-bold" onClick={resetFilters}>Reinitialiser les filtres</button>
      </div>
    </div>
  )
}

export default FilterBar