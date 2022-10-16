import React from 'react'
import "./Card.css"

const Card = () => {
  return (
    <>
      <div className='title'>Summary</div>
      <div className="card">
        <div className="card-1">
        <span className="material-icons-sharp">device_thermostat</span>
          <div className="content-card">
            <div className="left">
              <h3>Suhu</h3>
              <h1>26&deg;</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx={38} cy={38} r={36}> </circle>
              </svg>
              <div className="number">
                <p>80%</p>
              </div>
            </div>
          </div>

          <small className='text-history'>24 jam terakhir</small>
        </div>

        <div className="card-2">
          <span className="material-icons-sharp">query_stats</span>
          <div className="content-card">
            <div className="left">
              <h3>PH</h3>
              <h1>6</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx={38} cy={38} r={36}> </circle>
              </svg>
              <div className="number">
                <p>80%</p>
              </div>
            </div>
          </div>

          <small className='text-history'>24 jam terakhir</small>
        </div>

        <div className="card-3">
          <span className="material-icons-sharp">thermostat_auto</span>
          <div className="content-card">
            <div className="left">
              <h3>Kelembaban</h3>
              <h1>35%</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx={38} cy={38} r={36}> </circle>
              </svg>
              <div className="number">
                <p>80%</p>
              </div>
            </div>
          </div>

          <small className='text-history'>24 jam terakhir</small>
        </div>

        <div className="card-4">
          <span className="material-icons-sharp">battery_5_bar</span>
          <div className="content-card">
            <div className="left">
              <h3>Baterai</h3>
              <h1>50%</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx={38} cy={38} r={36}> </circle>
              </svg>
              <div className="number">
                <p>50%</p>
              </div>
            </div>
          </div>

          <small className='text-history'>24 jam terakhir</small>
        </div>
      </div>
    </>
  )
}

export default Card