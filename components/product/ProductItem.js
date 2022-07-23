/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Link from 'next/link'
import { DataContext } from '../../utils/GlobalState'
import { addToCart } from '../../utils/Actions'

function ProductItem({ product }) {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-primary btn-sm" type="button"><i className='fas fa-eye me-2'></i>Lihat Detail</a>
        </Link>
        <Link href={`https://wa.me/+6281946356207`}>
          <a className="btn btn-success btn-sm mt-2" type="button"><i className='fab fa-whatsapp me-2'></i>Hubungi Penjual</a>
        </Link>
        <button className="btn btn-danger btn-sm mt-2" type="button" onClick={() => dispatch(addToCart(product, cart))}>
          <i className='fas fa-basket-shopping me-2'></i>
          Masukan Keranjang
        </button>
      </>
    )
  }

  console.log(product)
  return (
    <div className="card shadow-0 border rounded-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
            <div className="bg-image hover-zoom ripple rounded ripple-surface">
              <img src={product.images[0].url} alt={product.images[0].url} className="w-100" />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6">
            <h5 title={product.title} className="text-uppercase fw-bold">{product.title}</h5>
            <div className="d-flex flex-row">
              <div className="text-warning mb-1 me-2">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half"></i>
              </div>
              <span>400</span>
            </div>
            <p className="text-muted text-justify mb-4 mb-md-0">
              {product.description}
            </p>
          </div>
          <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
            <div className="d-flex flex-row align-items-center mb-1">
              <h4 className="mb-1 me-1">Rp. {product.price} /KG</h4>
            </div>
            <h6 className="text-success">Gratis Ongkir Kecamatan Banyuwangi & Rogojampi</h6>
            <div className="d-flex flex-column mt-4">
              {userLink()}
            </div >
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem