import "./Datatable.css"

const Datatable = ({pesertaKategori, posKategori}) => {
 
  return (
    <>
      <div className='datatable card-content'>
        {
          (pesertaKategori == "")
          ? (<h2 className="text-center">Belum ada data</h2>)
          :  (
            <table>
              <thead>
              <tr>                             
                <th>No Peserta</th>
                {
                  posKategori.map((dataPOS, i) => (
                    <th key={dataPOS.id} className="col-nama">{dataPOS.nama_pos}</th>
                    ))
                }
                
                <th className="col-nama">Aksi</th>
                
              </tr>
              </thead>
              <tbody>
              {
                pesertaKategori.map((dataKat, i) => (
                  <tr key={dataKat.uuid}>
                      <td className="text-center" >{dataKat.no_peserta}</td>
                      {
                        posKategori.map((dataPOS, i) => (
                          <td key={i} className="text-center">
                            
                          {
                            dataKat.id_pos.split(',').map((pos, i) => {
                              return <>{ 
                                  (dataKat.id_pos.split(',')[i] == dataPOS.id)
                                  ? (<span key={i} className="material-icons-sharp">check_circle</span>)
                                  : (<span></span>)
                                  
                                }</>
                            })
                          }
                          </td>
                        ))
                      }
                      <td></td>
                      <td className="primary">Detail</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
            )
        }
      </div>
      
    </>
  )
}

export default Datatable
