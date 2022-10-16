import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import { Datatable, Navbar, AddPeserta} from '../'


const DataContent = () => {

  const [aktifMenu, setAktifMenu] = useState()
  const [pesertaKategori, setPesertaKategori] = useState([])
  const [menuKategori, setMenuKategori] = useState([])
  const [posKategori, setPosKategori] = useState([])
  const [posMenu, setPosMenu] = useState([])
  const [idKategori, setIdKategori] = useState("")

  // const {user} = useSelector((state) => state.auth)
  
  const getMenuKategori = async() =>{
    const Q_Kategori = await axios.get('http://localhost:5001/kategori')
    setMenuKategori(Q_Kategori.data)
  }
  
  const showData = async(idkat, i) =>{
    setAktifMenu(i)
    setIdKategori(idkat)

    const Q_pesertaKategori = await axios.get(`http://localhost:5001/peserta/kat/${idkat}`)
    setPesertaKategori(Q_pesertaKategori.data.data)

    const Q_pos = await axios.get(`http://localhost:5001/pos/${idkat}`)
    setPosKategori(Q_pos.data.data)
    
    const Q_posMenu = await axios.get(`http://localhost:5001/namapos/${idkat}`)
    setPosMenu(Q_posMenu.data.data)
 } 

  useEffect(() => {
    // showData(idKategori, aktifMenu)
    getMenuKategori()
  }, [])


  return (
    <>
    
      <Navbar menuKategori={menuKategori} aktifMenu={aktifMenu} showData={showData}/>
      <Datatable pesertaKategori = {pesertaKategori} posKategori = {posKategori}/>
      {
        posMenu.map((data) => (
            (aktifMenu == null) ? '' : <AddPeserta namaPos = {data.nama_pos} kategori= {idKategori} pos={data.id}/>
        ))
      }

    </>
  )
}

export default DataContent