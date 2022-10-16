import React, {useRef} from 'react'
import "./Modal.css"
import ReactDom from "react-dom"
import { AddPanitia, AddKategori } from '../index'

export const Modal = ({setShowModal, modalTitle}) => {

  const modalRef = useRef()
  const closeModal = (e) =>{
    if (e.target === modalRef.current) {
      setShowModal(false)
      document.getElementById('container').classList.remove('blur') 
    }
  }

  const closeX = () =>{
    setShowModal(false)
    document.getElementById('container').classList.remove('blur') 
  }


  return ReactDom.createPortal(
    <div className="modal-container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
          <div className="modal-title">Tambah {modalTitle}</div>
          <button onClick={closeX} className="btn-close">x</button>
          <div className='modal-content'>
              {(modalTitle === "Kategori") ? <AddKategori /> : <AddPanitia/>}
          </div>
      </div>
    </div>, document.getElementById("portal")
  )
}