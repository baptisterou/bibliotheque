import React from 'react'

function BookCard(props) {
  return (
    <div className='col-3 d-flex flex-column align-items-center mt-5 p-5 rounded bg-white'>
      <div className="card" style={{width: '18rem'}}>
        <img src={props.src} className="card-img-top img-fluid" alt={props.titre} style={{maxHeight : '200px', objectFit: 'contain'}}/>
        <div className="card-body">
        <h5 className="card-title">{props.titre}</h5>
        <h5 className="card-title">{props.auteur}</h5>
        <h5 className="card-title">{props.genre}</h5>
        <h5 className="card-title">{props.date}</h5>
        <p className="card-text">{props.resume}</p>
          <div className='d-flex justify-content-around flex-wrap'>
          <a href="#" className='btn btn-primary px-3 my-1'>Modifier</a>
          <a href="#" className='btn btn-danger px-3 my-1'>Supprimer</a>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard