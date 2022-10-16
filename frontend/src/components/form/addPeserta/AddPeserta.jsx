import {useState, useEffect} from 'react'
import "./AddPeserta.css"
import axios from 'axios'


const AddPeserta = ({pos, namaPos, kategori}) => {
    const [noPeserta1, setNoPeserta1] = useState("")
    const [noPeserta2, setNoPeserta2] = useState("")
    const [noPeserta3, setNoPeserta3] = useState("")
    const [noPeserta4, setNoPeserta4] = useState("")

    const [msg, setMsg] = useState()

    const savePeserta = async(e) =>{
        e.preventDefault()

        try {
            await axios.post('http://localhost:5001/peserta',{
                kategori: kategori,
                pos: pos,
                peserta1: noPeserta1,
                peserta2: noPeserta2,
                peserta3: noPeserta3,
                peserta4: noPeserta4,
            })
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <>
        <div className="form card-content">
            
            <form onSubmit={savePeserta}>
                <div className="form-title text-center">{namaPos} id {kategori}</div>
                <div className="form-title text-center">{msg}</div>

                <div className="form-peserta">
                    <div className="input-box">
                        <span className="details">No Peserta</span>
                        <input type="number" placeholder="Masukan No Peserta" value={noPeserta1} onChange={(e) => setNoPeserta1(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <span className="details">No Peserta</span>
                        <input type="number" placeholder="Masukan No Peserta" value={noPeserta2} onChange={(e) => setNoPeserta2(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <span className="details">No Peserta</span>
                        <input type="number" placeholder="Masukan No Peserta" value={noPeserta3} onChange={(e) => setNoPeserta3(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <span className="details">No Peserta</span>
                        <input type="number" placeholder="Masukan No Peserta" value={noPeserta4} onChange={(e) => setNoPeserta4(e.target.value)}/>
                    </div>
                </div>
                <div className="btn-submit">
                    <input type="submit" value="Submit Data"/>
                </div>

            </form>
        </div>
    </>
  )
}

export default AddPeserta