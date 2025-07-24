// Composant barre de filtres pour rechercher et filtrer les livres
function FilterBar({books, onGenreChange, onYearChange, onInputChange, onFavoriFilterChange, onStatutLectureChange, genre, year, input, isFavoriFilter, statutLectureFilter}) {
  
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

  function handleStatutLectureChange(e){
    onStatutLectureChange(e.target.value);
  }

  // Fonction pour tout remettre à zéro
  function resetFilters(){
    onGenreChange('');
    onYearChange('');
    onInputChange('');
    onFavoriFilterChange(false);
    onStatutLectureChange('');
  }
  
  return (
    <div className='filter-container'>
      <div className='filter-grid'>
        {/* Champ de recherche textuelle */}
        <div className='filter-group '>
          <label className='filter-label' htmlFor="recherche">
            <span className="filter-icon">🔍</span>
            Recherche
          </label>
          <input 
            type="text" 
            name="recherche" 
            value={input} 
            onChange={handleInputChange}
            placeholder="Titre, auteur, résumé..."
            className="filter-input"
          />
        </div>
        
        {/* Sélecteur de genre */}
        <div className='filter-group'>
          <label className='filter-label' htmlFor="genre">
            <span className="filter-icon">📚</span>
            Genre
          </label>
          <select name="genre" value={genre} onChange={handleGenreChange} className="filter-select">
            <option value="">Tous les genres</option>
            {genresBooks.sort().map((genre)=>
            <option key={genre} value={genre}>{genre}</option>
            )}
          </select>
        </div>
        
        {/* Sélecteur d'année */}
        <div className='filter-group'>
          <label className='filter-label' htmlFor="annee">
            <span className="filter-icon">📅</span>
            Année
          </label>
          <select name="annee" value={year} onChange={handleYearChange} className="filter-select">
            <option value="">Toutes les années</option>
            {yearBooks.sort().map((year)=>
            <option key={year} value={year}>{year}</option>
            )}
          </select>
        </div>
        
        {/* Sélecteur de statut de lecture */}
        <div className='filter-group'>
          <label className='filter-label' htmlFor="statutLecture">
            <span className="filter-icon">📖</span>
            Statut de lecture
          </label>
          <select name="statutLecture" value={statutLectureFilter} onChange={handleStatutLectureChange} className="filter-select">
            <option value="">Tous les statuts</option>
            <option value="non-lu">Non lu</option>
            <option value="en-cours">En cours</option>
            <option value="lu">Lu</option>
          </select>
        </div>
        
        {/* Checkbox pour les favoris uniquement */}
        <div className='filter-group filter-checkbox'>
          <label className='filter-label' htmlFor="favoris">
            <span className="filter-icon">⭐</span>
            Favoris
          </label>
          <div className="checkbox-container">
            <input 
              type="checkbox" 
              id="favoris" 
              name="favoris" 
              checked={isFavoriFilter}
              onChange={handleFavoriFilterChange}
              className="filter-checkbox-input"
            />
            <label htmlFor="favoris" className="filter-checkbox-label">
              <span className="checkbox-check">✓</span>
            </label>
          </div>
        </div>
        
        
        {/* Bouton pour tout remettre à zéro */}
        <div className='filter-group filter-reset'>
          <button className="btn btn-secondary" onClick={resetFilters}>

            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar