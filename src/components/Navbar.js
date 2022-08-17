import React from 'react'
import {Link, useLocation} from "react-router-dom"
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
  const location= useLocation();
  const navigate = useNavigate();
  const submitLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.path==="/"?'active': ''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.path==="/about"?'active': ''}`} to="/about">About</Link>
        </li>
       
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-light mx-1" to='/login' role='button'>Login</Link>
        <Link className="btn btn-light mx-1" to='/signup' role='button'>SignUp</Link>
      </form>: <button className='btn btn-light' onClick={submitLogout}>LogOut</button>}
    </div>
  </div>
</nav>
  )
}
