import React from 'react'


function Header() {
  return (
    <div className=''>
      <div className='bg-primary bg-gradient text-white py-5 '>
        <h1 className='mb-3 ms-5'>Bibliothèque</h1>
        <nav className='d-flex list-unstyled '>
          {/* <Link to='/' className='me-3 mb-3'>Accueil</Link>
          <Link to='/addBook' className='fw-bold text-reset text-decoration-none'>Ajouter un livre</Link> */}
        </nav>
      </div>
      <div className='bg-light py-5'>
        <button className='btn btn-success mx-5'>Ajouter un livre</button>
        <button className='btn btn-primary'>Afficher les filtres</button>
      </div>
    </div>
  )
}

export default Header