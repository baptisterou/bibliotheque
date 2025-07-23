// Imports nécessaires
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Page pour modifier un livre existant
function EditBook({books, updateBook}) {
  // Récupération de l'ID du livre depuis l'URL
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id
  
  // Recherche du livre à modifier dans la liste
  const book = books ? books.find(book => book.id === id) : null;

  // États pour gérer les champs du formulaire
  const[inputTitre, setTitre] = useState('');
  const[inputAuteur, setAuteur] = useState('');
  const[inputGenre, setGenre] = useState('');
  const[inputDate, setDate] = useState('');
  const[inputSrc, setSrc] = useState('');
  const[inputResume, setResume] = useState('');

  // Effet pour remplir le formulaire avec les données du livre quand il est trouvé
  useEffect(() => {
    if (book) {
      setTitre(book.titre || '');
      setAuteur(book.auteur || '');
      setGenre(book.genre || '');
      setDate(book.date || '');
      setSrc(book.couverture || '');
      setResume(book.resume || '');
    }
  }, [book]);

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

    // Création de l'objet livre modifié
    const updatedBook = {
      id: id,
      titre: inputTitre,
      auteur: inputAuteur,
      genre: inputGenre,
      date: inputDate,
      couverture: inputSrc,
      resume: inputResume
    };

    // Appel de la fonction pour mettre à jour le livre
    updateBook(id, updatedBook);
    
    // Retour à la page d'accueil
    navigate('/');
  }

  // Si les livres ne sont pas encore chargés
  if (!books || books.length === 0) {
    return <div className='text-center mt-5'>Chargement...</div>;
  }

  // Si le livre à modifier n'existe pas
  if (!book) {
    return <div className='text-center mt-5'>Livre non trouvé</div>;
  }

  return (
    <div className='d-flex flex-column col-12 align-items-center'>
      <div className='col-4 my-5'>
        {/* Formulaire de modification pré-rempli */}
        <form onSubmit={handleSubmit}>
        <h3>Modifier le livre</h3>
        <div className='d-flex flex-column'>
          {/* Champs obligatoires marqués avec * */}
          <label htmlFor="titre">Titre *</label>
          <input 
          type="text" className='mb-3' 
          name='Titre'
          value={inputTitre}
          onChange={handleTitre}
          />
          <label htmlFor="auteur">Auteur *</label>
          <input 
          type="text" className='mb-3' 
          name='auteur'
          value={inputAuteur}
          onChange={handleAuteur}
          />
          <label htmlFor="genre">Genre *</label>
          <input 
          type="text" className='mb-3' 
          name='genre'
          value={inputGenre}
          onChange={handleGenre}
          />
          <label htmlFor="datePublication">Date de publication *</label>
          <input 
          type="date" className='mb-3' 
          name="datePublication" 
          value={inputDate}
          onChange={handleDate}
          />
          {/* Champ optionnel pour l'image */}
          <label htmlFor="urlCover">Url de la couverture</label>
          <input 
          type="text" className='mb-3' 
          name="urlCover" 
          value={inputSrc}
          onChange={handleSrc}
          />
          <label htmlFor="resume">Résumé *</label>
          <textarea 
          name="resume" className='mb-3' cols="30" rows="10" 
          value={inputResume}
          onChange={handleResume}>

          </textarea>
          {/* Bouton pour sauvegarder les changements */}
          <button type="submit" className='btn btn-success mx-5'>Enregistrer les modifications</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook