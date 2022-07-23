/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../config/fetchingData'
import { DataContext } from '../../utils/GlobalState'
import { addToCart } from '../../utils/Actions'

const DetailProduct = (props) => {
  const [product] = useState(props.product)
  const [tab, setTab] = useState(0)

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const isActive = (index) => {
    if (tab === index) return " active";
    return ""
  }

  return (
    <div>
      <Head>
        <title>Detail Produk</title>
      </Head>
      <div className="container py-4">
        <div className="row detail_page">
          <div className="col-md-6">
            <img src={product.images[tab].url} alt={product.images[tab].url}
              className="d-block img-thumbnail rounded mt-4 w-100"
              style={{ height: '350px' }} />

            <div className="row mx-0" style={{ cursor: 'pointer' }} >

              {product.images.map((img, index) => (
                <img key={index} src={img.url} alt={img.url}
                  className={`img-thumbnail rounded ${isActive(index)}`}
                  style={{ height: '80px', width: '20%' }}
                  onClick={() => setTab(index)} />
              ))}

            </div>
          </div>

          <div className="col-md-6 mt-3">
            <h2 className="text-uppercase">{product.title}</h2>
            <h5 className="text-primary">Rp. {product.price}</h5>

            <div className="my-2">{product.description}</div>
            <div className="my-2">
              {product.content}
            </div>

            <button type="button" className="btn btn-success d-block my-3 px-5"
              onClick={() => dispatch(addToCart(product, cart))} >
              <i className="fas fa-basket-shopping me-2"></i> Masukan Keranjang
            </button>

          </div>
        </div>
      </div>
    </div>

  )
}

export async function getServerSideProps({ params: { id } }) {

  const res = await getData(`product/${id}`)
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  }
}


export default DetailProduct