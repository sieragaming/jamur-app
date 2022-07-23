import React, { useContext } from 'react'
import { DataContext } from '../utils/GlobalState'
import { deleteItem } from '../utils/Actions'
import { deleteData } from '../config/fetchingData'
import { useRouter } from 'next/router'

function Modal() {
  const { state, dispatch } = useContext(DataContext)
  const { modal, auth } = state

  const router = useRouter()

  const deleteUser = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type))

    deleteData(`user/${item.id}`, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      })
  }

  const deleteCategories = (item) => {
    deleteData(`categories/${item.id}`, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch(deleteItem(item.data, item.id, item.type))
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      })
  }

  const deleteProduct = (item) => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    deleteData(`product/${item.id}`, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push('/')
      })
  }

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === 'ADD_CART') {
          dispatch(deleteItem(item.data, item.id, item.type))
        }

        if (item.type === 'ADD_USERS') deleteUser(item)

        if (item.type === 'ADD_CATEGORIES') deleteCategories(item)

        if (item.type === 'DELETE_PRODUCT') deleteProduct(item)

        dispatch({ type: 'ADD_MODAL', payload: [] })
      }
    }
  }

  return (
    <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-uppercase fw-bold"> {modal.length !== 0 && modal[0].title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Apakah Anda Mau Menghapus Item Ini ?.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={handleSubmit} data-bs-dismiss="modal">Ya</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Tidak</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal