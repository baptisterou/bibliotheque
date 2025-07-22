import React from 'react'
import { NavLink, Link } from 'react-router-dom'

function BookCard({titre, auteur, genre, date, resume, src, id, deleteEntry}) {

  function handleDelete () {
    deleteEntry(id);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className='col-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column align-items-center mt-5 p-5 rounded '>
      <div className="card border border-2 shadow-lg" style={{width: '18rem', height: '600px'}}>
        <img src={src} className="card-img-top img-fluid mt-1" alt={titre} style={{maxHeight : '200px', objectFit: 'contain'}}/>
        <div className="card-body d-flex flex-column">
        <h5 className="card-title my-2">{titre}</h5>
        <h6 className="card-title my-2">{auteur}</h6>
        <h6 className="card-title my-2">{genre}</h6>
        <h6 className="card-title my-2">{formatDate(date)}</h6>
        <p className="card-text flex-grow-1">{resume}</p>
          <div className='d-flex justify-content-around flex-wrap mt-auto'>
                    <Link to={`/edit/${id}`} className='btn btn-primary px-3 my-1'>Modifier</Link>
          <a href="#" id={id} className='btn btn-danger px-3 my-1' onClick={handleDelete}>Supprimer</a>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard

