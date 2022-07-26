/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../utils/GlobalState'
import { useRouter } from 'next/router'
import OrderDetail from '../../components/OrderDetail'


const DetailOrder = () => {
  const { state, dispatch } = useContext(DataContext)
  const { orders, auth } = state

  const router = useRouter()

  const [orderDetail, setOrderDetail] = useState([])

  useEffect(() => {
    const newArr = orders.filter(order => order._id === router.query.id)
    setOrderDetail(newArr)
  }, [orders])

  if (!auth.user) return null;
  return (
    <div>
      <Head>
        <title>Detail Orders</title>
      </Head>
      <div className="container">
        <div className="my-5">
          <div>
            <button className="btn btn-dark" onClick={() => router.back()}>
              <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
            </button>
          </div>

          <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />

        </div>
      </div>
    </div>

  )
}

export default DetailOrder