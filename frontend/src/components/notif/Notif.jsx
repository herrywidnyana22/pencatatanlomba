import React from 'react'
import "./Notif.css"

const Notif = () => {
  return (
    <>
      <div className="feed">
        <div className="notif-bar">
          <div className="title">Feed</div>
          <div className="notif-icon">
            <span className="material-icons-sharp">notifications</span>
            <p>22</p>
          </div>
          
        </div>
        <div className="card-content">
          <div className="feed-content">
            <div className="photo-feed">
              <img src="logo512.png" alt="" />
            </div>
            <div className="isi-feed">
              <p><b>Device</b> dimbang batas yg ditentukan</p>
              <small className='text-history'>18 jam yg lalu</small>
            </div>
          </div>

          <div className="feed-content">
            <div className="photo-feed">
              <img src="logo512.png" alt="" />
            </div>
            <div className="isi-feed">
              <p><b>Device</b> dimbang batas yg ditentukan</p>
              <small className='text-history'>18 jam yg lalu</small>
            </div>
          </div>

          <div className="feed-content">
            <div className="photo-feed">
              <img src="logo512.png" alt="" />
            </div>
            <div className="isi-feed">
              <p><b>Device</b> dimbang batas yg ditentukan</p>
              <small className='text-history'>18 jam yg lalu</small>
            </div>
          </div>
          <div className="feed-content">
            <div className="photo-feed">
              <img src="logo512.png" alt="" />
            </div>
            <div className="isi-feed">
              <p><b>Device</b> dimbang batas yg ditentukan</p>
              <small className='text-history'>18 jam yg lalu</small>
            </div>
          </div>
          <div className="feed-content">
            <div className="photo-feed">
              <img src="logo512.png" alt="" />
            </div>
            <div className="isi-feed">
              <p><b>Device</b> dimbang batas yg ditentukan</p>
              <small className='text-history'>18 jam yg lalu</small>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notif