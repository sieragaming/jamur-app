/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import { DataContext } from '../utils/GlobalState'
import CardItem from '../components/CardItem'
import Link from 'next/link'
import { getData, postData } from '../config/fetchingData'
import { useRouter } from 'next/router'

function Cart() {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state

  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [payment, setPayment] = useState('Cash On Delivery (COD)')

  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(res)
    }

    getTotal()
  }, [cart])


  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({ type: 'NOTIFY', payload: { error: 'Tolong Isi Alamat Penerima Dan No Handphone Penerima' } })

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    postData('order', { address, mobile, cart, payment, total }, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch({ type: 'ADD_CART', payload: [] })

        const newOrder = {
          ...res.newOrder,
          user: auth.user
        }
        dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push(`/order/${res.newOrder._id}`)
      })

  }

  if (cart.length === 0)
    return (
      <div className='my-5'>
        <center>
          <img className="img-responsive" height="300px" width="auto" src="/image/gambar4.png" alt="not empty" />
          <h1 className='text-uppercase fw-bold mt-3'>Keranjang Kosong</h1>
        </center>
      </div>
    )

  const isTitle = () => {
    if (auth.user === true) {
      return 'Keranjang'
    }
    return 'Keranjang'
  }

  return (
    <div>
      <Head>
        <title>{isTitle()}</title>
      </Head>
      <div className='container'>
        <div className='row mx-auto'>
          <div className='col-md-6 text-secondary table-responsive my-5'>
            <h3 className='text-uppercase fw-bold'>Keranjang Belanja</h3>

            <table className='table my-3'>
              <tbody>
                {
                  cart.map(item => (
                    <CardItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className='col-md-6 text-uppercase my-5 fw-bold'>
            <h3 className='text-uppercase text-end  text-secondary fw-bold'>Pengiriman</h3>
            <form className='mx-2'>
              <label htmlFor='address' className='form-label'>Alamat Penerima/Yang Dituju</label>
              <textarea type="text" className='form-control mb-2 fw-semibold' name="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Masukan Alamat Penerima" />

              <label htmlFor='address' className='form-label'>No Handphone Penerima</label>
              <input type="number" className='form-control mb-2  fw-semibold' name="mobile" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Masukan No Handphone Penerima" />

              <label htmlFor='address' className='form-label'>Metode Pembayaran</label>
              <input type="text" className='form-control mb-2  fw-semibold' name="payment" value={payment} onChange={e => setPayment(e.target.value)} disabled />

              <h3 className="fw-bold text-end mt-3">Total : <span className="text-info">Rp. {total}</span></h3>
            </form>

            <div className="d-md-flex justify-content-md-end">
              <Link href={auth.user ? '#!' : '/signin'}>
                <a className='btn btn-primary px-4 mt-2 text-uppercase fw-bold' onClick={handlePayment}>Buat Pesanan</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart