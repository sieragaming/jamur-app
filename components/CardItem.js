/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { decrease, increase } from '../utils/Actions'

function CardItem({ item, dispatch, cart }) {
  return (
    <tr>
      <td style={{ width: '100px', overflow: 'hidden' }}>
        <img src={item.images[0].url} alt={item.images[0].url} className="img-thumbnail"
          style={{ minWidth: '100px', height: '80px', width: 'auto' }} />
      </td>
      <td style={{ minWidth: '90px' }} className="align-middle">
        <h6>
          <Link href={`/product/${item._id}`}>
            <a className='text-uppercase fw-bold'>{item.title}</a>
          </Link>
        </h6>
        <h6 className='text-secondary fw-bold'>Rp. {item.price}</h6>
      </td>
      <td className="align-middle " style={{ minWidth: '100px', cursor: "pointer" }}>
        <h6 className='text-uppercase fw-bold'>
          Jumlah/Kg
        </h6>
        <button className="btn btn-primary btn-sm"
          onClick={() => dispatch(decrease(cart, item._id))}
          disabled={item.quantity === 1 ? true : false} > <i className="fas fa-minus fa-sm"></i> </button>

        <span className="px-3">{item.quantity}</span>

        <button className="btn btn-primary btn-sm"
          onClick={() => dispatch(increase(cart, item._id))}
          disabled={item.quantity === item.inStock ? true : false} > <i className="fas fa-plus fa-sm"></i> </button>
      </td>
      <td className="align-middle" style={{ minWidth: '10px', cursor: 'pointer' }}>
        <i className="fas fa-trash text-danger" aria-hidden="true"
          style={{ fontSize: '18px' }} data-bs-toggle="modal" data-bs-target="#exampleModal"
          onClick={() => dispatch({
            type: 'ADD_MODAL',
            payload: [{ data: cart, id: item._id, title: item.title, type: 'ADD_CART' }]
          })} ></i>
      </td>
    </tr>
  )
}

export default CardItem