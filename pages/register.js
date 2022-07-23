/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import valid from '../config/valid';
import { DataContext } from '../utils/GlobalState';
import { postData } from '../config/fetchingData';
import { useRouter } from 'next/router'

function Register() {
  const initialState = { username: '', email: '', password: '', cpassword: '' }
  const [userData, setUserData] = useState(initialState)
  const { username, email, password, cpassword } = userData

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
    const errMsg = valid(username, email, password, cpassword)
    if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/register', userData)

    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    return (dispatch({ type: 'NOTIFY', payload: { success: res.msg } }), router.push("/signin"))
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/signin")
  }, [auth])
  return (
    <>
      <Head>
        <title>Halaman Register</title>
      </Head>
      <section id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit} >
          <h1 className="h3 mb-3 fw-bold text-uppercase" style={{ textAlign: "center" }}> Registrasi Akun</h1>
          <input onChange={handleChangeInput} value={username} name='username' type="text" id="user-name" className="mb-3 form-control" placeholder="Masukan Username" />
          <input onChange={handleChangeInput} value={email} name='email' type="email" id="user-email" className="mb-3 form-control" placeholder="Masukan Email" />
          <input onChange={handleChangeInput} value={password} name='password' type="password" id="user-pass" className="mb-3 form-control" placeholder="Masukan Password" />
          <input onChange={handleChangeInput} value={cpassword} name='cpassword' type="password" id="user-repeatpass" className="mb-3 form-control" placeholder="Masukan Kembali Password" />

          <div className='row px-3'>
            <button className="btn btn-success btn-block" type="submit"><i className="fas fa-user-plus"></i> Daftar</button>
          </div>
          <hr />
          <p>Sudah Punya Akun ?</p>
          <Link href="/signin">
            <a className="btn btn-primary btn-block text-white" type="button" id="btn-signup"><i className="fas fa-sign-in-alt"></i> Masuk Sekarang</a>
          </Link>
        </form>
      </section>
    </>
  )
}

export default Register