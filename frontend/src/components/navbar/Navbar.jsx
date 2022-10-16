import "./Navbar.css"

const Navbar = ({menuKategori, aktifMenu, showData}) => {
  return (
    <>
      <div className="title">Data</div>
      <div className="navbar">
        <div className="menu">
          <ul>
            {
              menuKategori.map((data, i) => (
                <li key={data.uuid} className={aktifMenu === i ? 'active' : ''} onClick={()=> showData(data.id, i) }><a>{data.nama_kategori}({data.jumlah_pos})</a></li>
                ))
            }
          </ul>
        </div>
        {/* <div className="date">
          <input type="date" name="" id="" />
        </div> */}
      </div>
      
    </>
  )
}

export default Navbar