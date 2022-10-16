import "../Form.css"
import { useState } from "react"

const AddKategori = () => {
  const [namaPos, setNamaPos] = useState([])
  const [nmKategori, setNmKategori] = useState("")
  const [jumlahPos, setJumlahPos] = useState (0)

  const pushData = (pos) => {
    setJumlahPos(current => [...current, pos])
  }
  let textPos =[]
  let dataPos = []


  for (let i=0; i< jumlahPos; i++){
    textPos.push(`<div className="input-box">
    <span className="details">Nama Kategori</span>
    <input type="text" placeholder="Cth: Dewasa - Pria"/>
  </div>`)
  }

  return (
    <div className="form-container">
      <form action="">
          <h2>Kategori</h2>
          <div className="form-kategori">
            <div className="input-box">
              <span className="details">Nama Kategori</span>
              <input type="text" name="namaKategori" placeholder="Cth: Dewasa - Pria" onChange={(e)=> setNmKategori(e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="details">Jumlah Pos</span>
              <input type="number" placeholder="Cth: 1" onChange={(e)=> setJumlahPos(e.target.value)}/>
            </div>
          </div>

          {(jumlahPos <= 0 || jumlahPos == "") ? <></> : <h2>Pos</h2> } 
          <div className="form-kategori pos-content">
            {textPos.map((data, i)=>(
              <>
                <div key={i} className="input-box">
                  <span className="details">Nama Pos ke {i+1}</span>
                  <input type="text" name={`pos${i+1}`} placeholder="Cth: Pos 1 atau Pos Finish" onChange={(e)=> {
                    const namaPos = e.target.value
                    setNamaPos((currentPos) => currentPos.map(x => x.i === i ? {...x, namaPos} : x))
                  }}/>
                  
                </div>
              </>
            ))}
            {
              // namaPos.map(data => <div>{data}</div>)
              namaPos
            }   
          </div>
        {/* <div className="btn-simpan" onClick={pushData()}>Simpan</div> */}
      </form>
    </div>
  )
}

export default AddKategori