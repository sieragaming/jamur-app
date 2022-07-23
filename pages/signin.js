/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { DataContext } from '../utils/GlobalState';
import { postData } from '../config/fetchingData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

function Signin() {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const res = await postData('auth/login', userData)

    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

    dispatch({
      type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
    router.push("/")
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <>
      <Head>
        <title>Halaman Login</title>
      </Head>
      <section id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit} >
          <h1 className="h3 mb-3 fw-bold text-uppercase" style={{ textAlign: "center" }}> Toko Jamur Tiram</h1>
          <input value={email} onChange={handleChangeInput} name='email' type="email" id="inputEmail" className="mb-3 form-control" placeholder="Email address" />
          <input value={password} onChange={handleChangeInput} name='password' type="password" id="inputPassword" className="mb-3 form-control" placeholder="Password" />
          <div className='row px-3'>
            <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i> Masuk</button>
          </div>
          <hr />
          <p>Belum Punya Akun !!</p>
          <Link href="/register">
            <a className="btn btn-primary btn-block text-white" type="button"><i className="fas fa-user-plus"></i> Daftar Disini</a>
          </Link>
        </form>
      </section>
    </>
  )
}

export default Signin