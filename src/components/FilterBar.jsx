import React from 'react'

function FilterBar({books, onGenreChange, onYearChange, onInputChange, genre, year, input}) {
  

  let filteredBooksForGenres = books;
  
  if (year) {
    filteredBooksForGenres = filteredBooksForGenres.filter(book => book.date.substring(0,4) === year);
  }
  
  if (input) {
    filteredBooksForGenres = filteredBooksForGenres.filter(book => 
      book.titre.toLowerCase().includes(input.toLowerCase()) ||
      book.auteur.toLowerCase().includes(input.toLowerCase()) ||
      book.resume.toLowerCase().includes(input.toLowerCase())
    );
  }
  
  const genresBooks = [... new Set(filteredBooksForGenres.map((book)=> book.genre))];
  
  let filteredBooksForYears = books;
  
  if (genre) {
    filteredBooksForYears = filteredBooksForYears.filter(book => book.genre === genre);
  }
  
  if (input) {
    filteredBooksForYears = filteredBooksForYears.filter(book => 
      book.titre.toLowerCase().includes(input.toLowerCase()) ||
      book.auteur.toLowerCase().includes(input.toLowerCase()) ||
      book.resume.toLowerCase().includes(input.toLowerCase())
    );
  }
  
  const yearBooks = [... new Set(filteredBooksForYears.map((book) => book.date.substring(0,4)))];
  
  function handleGenreChange(e){
    onGenreChange(e.target.value);
  }

  function handleYearChange(e){
    onYearChange(e.target.value);
  }

  function handleInputChange(e){
    onInputChange(e.target.value);
  }

  function resetFilters(){
    onGenreChange('');
    onYearChange('');
    onInputChange('');
  }
  
  return (
    <div className='d-flex justify-content-around flex-wrap'>
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="recherche">Recherche</label>
        <input type="text" name="recherche" value={input} onChange={handleInputChange}/>
      </div>
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="genre">Filtrer par genre</label>
        <select name="genre" value={genre} onChange={handleGenreChange}>
          <option value="">Tous les genres</option>
          {genresBooks.sort().map((genre)=>
          <option key={genre} value={genre}>{genre}</option>
          )}
        </select>
      </div>
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="annee">Filtrer par annee</label>
        <select name="annee" value={year} onChange={handleYearChange}>
          <option value="">Année</option>
          {yearBooks.sort().map((year)=>
          <option key={year} value={year}>{year}</option>
          )}
        </select>
      </div>
      <div className='d-flex flex-column'>
        <div className='mb-3'></div>
        <button className="btn btn-secondary btn-sm fw-bold" onClick={resetFilters}>Reinitialiser les filtres</button>
      </div>
    </div>
  )
}

export default FilterBar