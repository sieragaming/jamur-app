/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import { DataContext } from '../utils/GlobalState'
import Link from 'next/link'
import valid from '../config/valid'
import { patchData } from '../config/fetchingData'
import { imageUpload } from '../config/imageUpload'


function Profile() {
  const initialSate = {
    avatar: '',
    username: '',
    password: '',
    cpassword: ''
  }
  const [data, setData] = useState(initialSate)
  const { avatar, username, password, cpassword } = data

  const { state, dispatch } = useContext(DataContext)
  const { users, auth, notify, orders, modal } = state

  const [toggle, setToggle] = useState(1)

  const toggleTab = (index) => {
    setToggle(index)
  }


  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.username })
  }, [auth.user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleUpdateProfile = e => {
    e.preventDefault()
    if (password) {
      const errMsg = valid(username, auth.user.email, password, cpassword)
      if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
      updatePassword()
    }

    if (username !== auth.user.name || avatar) updateInfor()
  }

  const updatePassword = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    patchData('user/resetPassword', { password }, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      })
  }

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    if (!file)
      return dispatch({ type: 'NOTIFY', payload: { error: 'File Tidak Ada' } })

    if (file.size > 1024 * 1024) //1mb
      return dispatch({ type: 'NOTIFY', payload: { error: 'File Terlalu Besar' } })

    if (file.type !== "image/jpeg" && file.type !== "image/png") //1mb
      return dispatch({ type: 'NOTIFY', payload: { error: 'Format Salah' } })

    setData({ ...data, avatar: file })
  }

  const updateInfor = async () => {
    let media;
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    if (avatar) media = await imageUpload([avatar])

    patchData('user', {
      username, avatar: avatar ? media[0].url : auth.user.avatar
    }, auth.token).then(res => {
      if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

      dispatch({
        type: 'AUTH', payload: {
          token: auth.token,
          user: res.user
        }
      })
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    })
  }


  if (!auth.user) return null;
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="container">
        <div className="profile_page">
          <section className="row text-secondary my-3">
            <div className="col-md-2">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src={auth.user.avatar} className="avatar" alt="avatar" />
                  <h5 className="mt-3 text-capitalize">{auth.user.username}</h5>
                  <hr className='divider' />
                  <p className="text-muted mb-1" style={{ fontSize: "8pt", fontWeight: "bold" }}>{auth.user.email}</p>
                </div>
              </div>
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className={toggle === 1 ? "nav-link active" : "nav-link"} onClick={() => toggleTab(1)} id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Ubah Profil</button>
                <button className={toggle === 2 ? "nav-link active" : "nav-link"} onClick={() => toggleTab(2)} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Pesanan</button>
                {
                  auth.user.role === 'admin' &&
                  <button className={toggle === 3 ? "nav-link active" : "nav-link"} onClick={() => toggleTab(3)} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Pengguna</button>
                }
              </div>
            </div>

            <div className="col-md-10">
              <div className="card mb-4">
                <div className="card-body tab-content" id="v-pills-tabContent">
                  <div className={toggle === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="1">
                    <h3 className=" text-uppercase">
                      {auth.user.role === 'user' ? 'Profile' : 'Admin Profile'}
                    </h3>
                    <hr className='solid' />
                    <div className='row'>
                      <div className='col-md-8'>
                        <div className="form-group">
                          <label htmlFor="name">Nama</label>
                          <input type="text" name="username" defaultValue={username} className="form-control"
                            onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input type="text" name="email" defaultValue={auth.user.email}
                            className="form-control" disabled={true} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password baru</label>
                          <input type="password" name="password" value={password} className="form-control"
                            onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="cf_password">Konfirmasi Password</label>
                          <input type="password" name="cpassword" value={cpassword} className="form-control"
                            onChange={handleChange} />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='text-center'>Ubah Gambar</div>
                        <div className="avatar">
                          <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                            alt="avatar" />
                          <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up"
                              accept="image/*" onChange={changeAvatar} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-info mt-2" disabled={notify.loading}
                      onClick={handleUpdateProfile}>
                      Update
                    </button>
                  </div>

                  <div className={toggle === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="2">
                    <h3 className="text-uppercase">Orders</h3>
                    <hr className='solid' />
                    <div className="my-3 table-responsive">
                      <table className="table table-bordered table-hover w-200 text-uppercase"
                        style={{ minWidth: '600px', cursor: 'pointer' }}>
                        <thead className="bg-light font-weight-bold">
                          <tr>
                            <td className="p-2">No. Pesanan</td>
                            <td className="p-2">No. HandPhone</td>
                            <td className="p-2">Tanggal Pesanan</td>
                            <td className="p-2">Total</td>
                            <td className="p-2">Status Pengiriman</td>
                            <td className="p-2">Status Pembayaran</td>
                          </tr>
                        </thead>

                        <tbody>
                          {
                            orders.map(order => (
                              <tr key={order._id}>
                                <td className="p-2">
                                  <Link href={`/order/${order._id}`}>
                                    <a>{order._id}</a>
                                  </Link>

                                </td>
                                <td className="p-2">
                                  {order.mobile}
                                </td>
                                <td className="p-2">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-2">Rp.{order.total}</td>
                                <td className="p-2">
                                  {
                                    order.delivered
                                      ? <span className='text-uppercase fw-semibold' style={{ fontSize: "7pt" }}> <i className="me-2 fas fa-check text-success"></i>Dikirim</span>
                                      : <span className='text-uppercase fw-semibold' style={{ fontSize: "7pt" }}> <i className="me-2 fas fa-times text-danger"></i>Belum Dikirim</span>
                                  }
                                </td>
                                <td className="p-2">
                                  {
                                    order.payment
                                      ? <span className='text-uppercase fw-semibold' style={{ fontSize: "7pt" }}><i className="fme-2 fas fa-check text-success"></i> {order.payment}</span>
                                      : <span className='text-uppercase fw-semibold' style={{ fontSize: "7pt" }}><i className="fme-2 fas fa-times text-success"></i> Belum Bayar</span>
                                  }
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>

                      </table>
                    </div>
                  </div>
                  {
                    auth.user.role === 'admin' &&
                    <div className={toggle === 3 ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="3">
                      <h3 className="text-uppercase">Pengguna</h3>
                      <hr className='solid' />
                      <div className="table-responsive">
                        <table className="table w-100">
                          <thead>
                            <tr>
                              <th></th>
                              <th>ID</th>
                              <th>Avatar</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Admin</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              users.map((user, index) => (
                                <tr key={user._id} style={{ cursor: 'pointer' }}>
                                  <th>{index + 1}</th>
                                  <th>{user._id}</th>
                                  <th>
                                    <img src={user.avatar} alt={user.avatar}
                                      style={{
                                        width: '30px', height: '30px',
                                        overflow: 'hidden', objectFit: 'cover'
                                      }} />
                                  </th>
                                  <th>{user.username}</th>
                                  <th>{user.email}</th>
                                  <th>
                                    {
                                      user.role === 'admin'
                                        ? user.root ? <span className="text-success pl-2"><i className="fas fa-check text-success"></i> Root</span>
                                          : <i className="fas fa-check text-success"></i>

                                        : <i className="fas fa-times text-danger"></i>
                                    }
                                  </th>
                                  <th>
                                    <Link href={
                                      auth.user.root && auth.user.email !== user.email
                                        ? `/edit/${user._id}` : '#!'
                                    }>
                                      <a><i className="fas fa-edit text-info me-2" title="Edit"></i></a>
                                    </Link>

                                    {
                                      auth.user.root && auth.user.email !== user.email
                                        ? <i className="fas fa-trash-alt text-danger ms-2" title="Remove"
                                          data-bs-toggle="modal" data-bs-target="#exampleModal"
                                          onClick={() => dispatch({
                                            type: 'ADD_MODAL',
                                            payload: [{ data: users, id: user._id, title: user.name, type: 'ADD_USERS' }]
                                          })}></i>

                                        : <i className="fas fa-trash-alt text-danger ms-2" title="Remove"></i>
                                    }

                                  </th>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>

                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile