import React, { useState, useEffect } from 'react'
import {Modal} from "../modal/Modal"
import PanitiaModal from "../modal/PanitiaModal"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut, reset } from '../../features/authSlice'

import "./MenuAdmin.css"


const MenuAdmin = (props) => {
  const [title, setTitle] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalPanitia, setModalPanitia] = useState(false)
  
  const openModal = (params) =>{
    setShowModal(true)
    document.getElementById('container').classList.add('blur')
    setTitle(params)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const logout = () => {
    dispatch(logOut())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <div className={`dropdown ${props.klik ? "show" : ""}`}>
          {
            (user && user.role === "admin")
            ? <>
                <div className="dropdown-items" onClick={() => openModal("Panitia")}>
                    <span className="material-icons-sharp primary">person_add</span>
                    Tambah Panitia
                </div>
                <div className="dropdown-items" onClick={() => openModal("Kategori")}>
                    <span className="material-icons-sharp success">category</span>
                    Tambah Kategori
                </div>
              </>
            : ''
          }
          

          <div className="logout" onClick={logout}>
              <span className="material-icons-sharp danger">logout</span>
              Logout
          </div>
      </div>
      {modalPanitia ? <PanitiaModal setModalPanitia ={setModalPanitia}/> : null}
      {showModal ? <Modal setShowModal ={setShowModal} modalTitle={title}/> : null}
    </>
  )
}

export default MenuAdmin