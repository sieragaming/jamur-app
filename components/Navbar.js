/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { DataContext } from '../utils/GlobalState';
import Cookie from 'js-cookie'


function Navbar() {
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state
  const isActive = (route) => {
    if (route === router.pathname) {
      return " text-uppercase fw-bold active"
    } else {
      return ""
    }
  }
  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
    router.push('/')
    return
  }
  const adminRouter = () => {
    return (
      <>
        <Link href="/categories">
          <a className="dropdown-item"><i className="fas fa-list mr-2"></i>Kategori</a>
        </Link>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={auth.user.avatar} alt={auth.user.avatar} className="image"
            style={{
              borderRadius: '50%', width: '30px', height: '30px',
              transform: 'translateY(-3px)', marginRight: '3px'
            }} /> {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link href="/profile">
            <a className="dropdown-item"><i className="fas fa-user mr-2"></i>Profil</a>
          </Link>
          {
            auth.user.role === 'admin' && adminRouter()
          }
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}><i className="fas fa-right-from-bracket mr-2"></i>Keluar</button>
        </div>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark">
      <div className="container py-3">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/image/gambar1.png" alt="" width="30" height="24" className="d-inline-block align-text-top white" />
            <span className='text-uppercase fw-bold ms-3'>Toko Jamur Tiram</span>
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className={"nav-link text-uppercase fw-bold" + isActive('/')}>Beranda</a>
              </Link>
            </li>

            <div className="vl"></div>
            <Link href="/cart">
              <li className="nav-item">
                <a className={"nav-link" + isActive('/cart')} >
                  <span className='fas fa-basket-shopping fa-lg position-relative' aria-hidden="true">
                    <span className="position-absolute"
                      style={{
                        padding: '7px 6px',
                        background: '#ed143dc2',
                        borderRadius: '100%',
                        top: '-10px',
                        right: '-10px',
                        color: 'white',
                        fontSize: '10px'
                      }}>
                      {cart.length}
                    </span>
                  </span>
                </a>
              </li>
            </Link>
            {
              Object.keys(auth).length === 0
                ? <li className="nav-item">
                  <Link href="/signin">
                    <a className="btn btn-dark ms-3" ><span className='fas fa-arrow-right-to-bracket fa-lg'></span></a>
                  </Link>
                </li>
                : loggedRouter()
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar