// Imports nécessaires
import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Page pour ajouter un nouveau livre
function AddBook({ newBook }) {

// Pour naviguer vers une autre page après ajout
const navigate = useNavigate();
  
// États pour gérer les champs du formulaire
const[inputTitre, setTitre] = useState('');
const[inputAuteur, setAuteur] = useState('');
const[inputGenre, setGenre] = useState('');
const[inputDate, setDate] = useState('');
const[inputSrc, setSrc] = useState('');
const[inputResume, setResume] = useState('');

  // Fonctions pour mettre à jour les champs quand on tape dedans
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

  // Fonction qui s'exécute quand on soumet le formulaire
  function handleSubmit(e) {
    e.preventDefault();
    
    // Vérification que tous les champs obligatoires sont remplis
    if (!inputTitre || !inputAuteur || !inputGenre || !inputDate || !inputResume) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    // Création de l'objet livre avec toutes les infos
    const addNewBook = {
      titre: inputTitre,
      auteur: inputAuteur,
      genre: inputGenre,
      date: inputDate,
      couverture: inputSrc,
      resume: inputResume
    };

    // Appel de la fonction pour ajouter le livre
    newBook(addNewBook);
    
    // Retour à la page d'accueil
    navigate('/');
  }


  return (
    <div className='d-flex flex-column col-12 align-items-center'>
      <div className='col-4 my-5'>
        {/* Formulaire pour ajouter un livre */}
        <form onSubmit={handleSubmit}>
        <h3>Ajouter un livre</h3>
        <div className='d-flex flex-column'>
          {/* Champs obligatoires marqués avec * */}
          <label htmlFor="titre">Titre *</label>
          <input type="text" className='mb-3' name='Titre' value={inputTitre} onChange={handleTitre} required/>
          <label htmlFor="auteur">Auteur *</label>
          <input type="text" className='mb-3' name='auteur' value={inputAuteur} onChange={handleAuteur} required/>
          <label htmlFor="genre">Genre *</label>
          <input type="text" className='mb-3' name='genre' value={inputGenre} onChange={handleGenre} required/>
          <label htmlFor="datePublication">Date de publication *</label>
          <input type="date" className='mb-3' name="datePublication" id="datePublication" value={inputDate} onChange={handleDate} required/>
          {/* Champ optionnel pour l'image de couverture */}
          <label htmlFor="urlCover">Url de la couverture</label>
          <input type="url" className='mb-3' name="urlCover" value={inputSrc} onChange={handleSrc}/>
          <label htmlFor="resume">Résumé *</label>
          <textarea name="resume" className='mb-3' cols="30" rows="10" value={inputResume} onChange={handleResume} required></textarea>
          {/* Bouton pour sauvegarder */}
          <button type="submit" className='btn btn-success mx-5'>Enregistrer les modifications</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook