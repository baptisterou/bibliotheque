import React from 'react'

function FilterBar() {
  return (
    <div className='d-flex justify-content-around'>
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="recherche">Recherche</label>
        <input type="text" name="recherche"/>
      </div>
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="genre">Filtrer par genre</label>
        <select name="genre">
          <option>Roman</option>
        </select>
      </div>
      <div className='d-flex flex-column'>
        <label className='mb-3' htmlFor="annee">Filtrer par annee</label>
        <select name="annee">
          <option>2010</option>
        </select>
      </div>
      <button class="btn btn-secondary fw-bold">Reinitialiser les filtres</button>
    </div>
  )
}

export default FilterBar