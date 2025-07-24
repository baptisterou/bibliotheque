import { useState, useEffect } from 'react'
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
    <div className='book-form-container'>
      <div className='book-form-card'>
        {/* Formulaire de modification avec design technique */}
        <form onSubmit={handleSubmit}>
          <h2 className='book-form-title'>
            <span className="code-accent">✏️</span> Modifier le livre
          </h2>
          
          <div className='book-form-group'>
            <label htmlFor="titre" className='book-form-label'>
              📖 Titre <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="text" 
              className='book-form-input' 
              name='Titre'
              value={inputTitre}
              onChange={handleTitre}
              placeholder="Saisissez le titre du livre"
              required
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="auteur" className='book-form-label'>
              ✍️ Auteur <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="text" 
              className='book-form-input' 
              name='auteur'
              value={inputAuteur}
              onChange={handleAuteur}
              placeholder="Nom de l'auteur"
              required
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="genre" className='book-form-label'>
              🏷️ Genre <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="text" 
              className='book-form-input' 
              name='genre'
              value={inputGenre}
              onChange={handleGenre}
              placeholder="Genre littéraire"
              required
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="datePublication" className='book-form-label'>
              📅 Date de publication <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <input 
              type="date" 
              className='book-form-input' 
              name="datePublication" 
              value={inputDate}
              onChange={handleDate}
              required
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="urlCover" className='book-form-label'>
              🖼️ URL de la couverture
            </label>
            <input 
              type="url" 
              className='book-form-input' 
              name="urlCover" 
              value={inputSrc}
              onChange={handleSrc}
              placeholder="https://exemple.com/couverture.jpg"
            />
          </div>
          
          <div className='book-form-group'>
            <label htmlFor="resume" className='book-form-label'>
              📝 Résumé <span style={{color: 'var(--danger)'}}>*</span>
            </label>
            <textarea 
              name="resume" 
              className='book-form-textarea' 
              value={inputResume}
              onChange={handleResume}
              placeholder="Décrivez brièvement l'histoire du livre..."
              required
            />
          </div>
          
          <button type="submit" className='book-form-submit'>
            💾 Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditBook