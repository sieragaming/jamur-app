import React from 'react'

function Footer() {
  return (
    <section className="">
      <footer className="bg-dark text-center text-white">
        <div className="container p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3 text-uppercase fw-bold">Ingin Punya Akun</span>
              <a type="button" className="btn btn-outline-light btn-rounded text-uppercase fw-bold">
                Klik Disini !!!!
              </a>
            </p>
          </section>
        </div>
        <div className="text-center p-3 text-uppercase fw-bold" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2022 Copyright: Moh.Nashor
        </div>
      </footer>
    </section>
  )
}

export default Footer