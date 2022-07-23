import React from 'react'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { patchData } from '../config/fetchingData'
import { updateItem } from '../utils/Actions'

function OrderDetail({ orderDetail, state, dispatch }) {
  const { auth, orders } = state

  const handleDelivered = (order) => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    patchData(`order/delivered/${order._id}`, null, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        const { paid, dateOfPayment, method, delivered } = res.result

        dispatch(updateItem(orders, order._id, {
          ...order, paid, dateOfPayment, method, delivered
        }, 'ADD_ORDERS'))

        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      })
  }

  if (!auth.user) return null;
  return (
    <>
      {
        orderDetail.map(order => (
          <div key={order._id} className="row justify-content-between">

            <div className="text-uppercase my-5" style={{ maxWidth: '600px' }}>
              <h2 className="text-break">Pesanan</h2>

              <div className="mt-4 text-secondary">
                <h4>Detail Pesanan</h4>
                <p>Nama: {order.user.username}</p>
                <p>Email: {order.user.email}</p>
                <p>Alamat: {order.address}</p>
                <p>No Handphone/Whatsapp: {order.mobile}</p>

                <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                d-flex justify-content-between align-items-center`} role="alert">
                  {
                    order.delivered ? `Pesanan Dikirim ${order.updatedAt}` : 'Belum Dikirim'
                  }
                  {
                    auth.user.role === 'admin' && !order.delivered &&
                    <button className="btn btn-dark text-uppercase"
                      onClick={() => handleDelivered(order)}>
                      Pembayaran Sudah Diterima
                    </button>
                  }

                </div>

                <h4>Payment</h4>
                <div className={`alert ${order.payment ? 'alert-success' : 'alert-danger'}
                d-flex justify-content-between align-items-center`} role="alert">
                  {
                    order.payment ? `Cash On Delivery (COD)` : ''
                  }

                </div>

                <div>
                  <h4>Daftar Pesanan</h4>
                  {
                    order.cart.map(item => (
                      <div className="row border-bottom mx-0 p-2 justify-content-between
                            align-items-center" key={item._id} style={{ maxWidth: '550px' }}>
                        <img src={item.images[0].url} alt={item.images[0].url}
                          style={{ width: 'auto', height: '45px', objectFit: 'cover' }} />

                        <h5 className="flex-fill text-secondary px-3 m-0">
                          <Link href={`/product/${item._id}`}>
                            <a>{item.title}</a>
                          </Link>
                        </h5>

                        <span className="text-info m-0">
                          {item.quantity} x Rp.{item.price} = Rp.{item.price * item.quantity}
                        </span>
                        <h4 className="mb-4 text-uppercase my-4">Total: Rp. {order.total}</h4>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default OrderDetail