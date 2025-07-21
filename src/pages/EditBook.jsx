import React from 'react'

function EditBook() {
  return (
    <div className='d-flex flex-column col-12 align-items-center'>
      <div className='col-4 mt-5'>
        <h3>Modifier le livre</h3>
        <div className='d-flex flex-column'>
          <label htmlFor="titre">Titre *</label>
          <input type="text" className='mb-3' name='Titre' />
          <label htmlFor="auteur">Auteur *</label>
          <input type="text" className='mb-3' name='auteur' />
          <label htmlFor="genre">Genre *</label>
          <input type="text" className='mb-3' name='genre' />
          <label htmlFor="datePublication">Date de publication *</label>
          <input type="date" className='mb-3' name="datePublication" id="datePublication" />
          <label htmlFor="urlCover">Url de la couverture</label>
          <input type="url" className='mb-3' name="urlCover" />
          <label htmlFor="resume">Résumé *</label>
          <textarea name="resume" className='mb-3' cols="30" rows="10"></textarea>
          <button type="submit">Enregistrer les modifications</button>
        </div>
      </div>
    </div>
  )
}

export default EditBook