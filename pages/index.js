/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useState } from 'react'
import { getData } from '../config/fetchingData'
import ProductItem from '../components/product/ProductItem'

function Home(props) {
  const [products, setProducts] = useState(props.products)
  console.log(products)
  return (
    <>
      <Head>
        <title>Beranda</title>
      </Head>
      <section>
        <div className="container col-xxl-8 px-2 py-2">
          <div className="row flex-lg-row-reverse align-items-center g-3 py-3">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src="/image/gambar3.jpg" className="d-block shadow mx-lg-auto img-fluid" alt="Bootstrap Themes" width="300" height="200" loading="lazy" style={{ borderRadius: "9px" }} />
            </div>
            <div className="col-lg-6">
              <h4 className="display-5 fw-bold lh-1 mb-3 text-uppercase">Jamur Tiram Segar</h4>
              <p className="lead">Jamur Tiram Segar Ini 100% Halal dan Aman Karena Dipanen Langsung Dari Petani Jamur Tiram <br /> UD. PUTRA AGUNG Ini Beralamat Di Dusun Kunir Desa Singojuruh</p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-light'>
        <div className="container py-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-12 col-xl-10">
              <h3 className='text-center text-uppercase fw-bold text-decoration-underline mb-4'>Produk</h3>
              {
                products.length === 0
                  ? <h2 className='p-2'>Produk Tidak Ada</h2>
                  : products.map(product => (
                    <ProductItem key={product._id} product={product} />
                  ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  const res = await getData('product')
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home