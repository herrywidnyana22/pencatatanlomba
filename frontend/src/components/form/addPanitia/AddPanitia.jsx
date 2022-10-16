import axios from "axios"
import React, { useState, useEffect } from 'react'

import "../Form.css"



const AddPanitia = () => {
  const cekPos = async () =>{
    const QCekPos = await axios.get('http://localhost:5001/pos')
    (QCekPos == null || QCekPos =="") ? console.log("kosong") : console.log("ada data")
  }
  
  useEffect(() => {
    cekPos()
  },[])

  return (
    <div>Form Panitia</div>
  )
}

export default AddPanitia