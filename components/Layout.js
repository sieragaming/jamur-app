import React from 'react'
import Footer from './Footer'
import Modal from './Modal'
import Navbar from './Navbar'
import Notify from './Notify'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Notify />
      <Modal />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout