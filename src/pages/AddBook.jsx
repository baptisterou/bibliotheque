import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddBook({ newBook }) {

const navigate = useNavigate();
  
const[inputTitre, setTitre] = useState('');
const[inputAuteur, setAuteur] = useState('');
const[inputGenre, setGenre] = useState('');
const[inputDate, setDate] = useState('');
const[inputSrc, setSrc] = useState('');
const[inputResume, setResume] = useState('');

  function handleTitre(e){
    setTitre(e.target.value)
  }

  function handleAuteur(e){
    setAuteur(e.target.value)
  }

  function handleGenre(e){
    setGenre(e.target.value)
  }

  function handleDate(e){
    setDate(e.target.value)
  }

  function handleSrc(e){
    setSrc(e.target.value)
  }

  function handleResume(e){
    setResume(e.target.value)
  }

    function handleSubmit(e) {
    e.preventDefault();
    
    if (!inputTitre || !inputAuteur || !inputGenre || !inputDate || !inputResume) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    const addNewBook = {
      titre: inputTitre,
      auteur: inputAuteur,
      genre: inputGenre,
      date: inputDate,
      couverture: inputSrc,
      resume: inputResume
    };

    newBook(addNewBook);
    
    navigate('/');
  }


  return (
    <div className='d-flex flex-column col-12 align-items-center'>
      <div className='col-4 my-5'>
        <form onSubmit={handleSubmit}>
        <h3>Ajouter un livre</h3>
        <div className='d-flex flex-column'>
          <label htmlFor="titre">Titre *</label>
          <input type="text" className='mb-3' name='Titre' value={inputTitre} onChange={handleTitre} required/>
          <label htmlFor="auteur">Auteur *</label>
          <input type="text" className='mb-3' name='auteur' value={inputAuteur} onChange={handleAuteur} required/>
          <label htmlFor="genre">Genre *</label>
          <input type="text" className='mb-3' name='genre' value={inputGenre} onChange={handleGenre} required/>
          <label htmlFor="datePublication">Date de publication *</label>
          <input type="date" className='mb-3' name="datePublication" id="datePublication" value={inputDate} onChange={handleDate} required/>
          <label htmlFor="urlCover">Url de la couverture</label>
          <input type="url" className='mb-3' name="urlCover" value={inputSrc} onChange={handleSrc}/>
          <label htmlFor="resume">Résumé *</label>
          <textarea name="resume" className='mb-3' cols="30" rows="10" value={inputResume} onChange={handleResume} required></textarea>
          <button type="submit" className='btn btn-success mx-5'>Enregistrer les modifications</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook