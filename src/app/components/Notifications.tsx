import React from 'react'
import './css/Notify.css'

function Notifications() {
  return (
    <div className='contents'>
    <div style={{width: '100%', display: 'flex', alignItems: 'center',  flexDirection: 'column'}}>
    <div className='notify_hero'>
    </div>
    <br />
    <p style={{fontSize: 10}}>You don't have any messages yet.</p>

    </div>
    </div>
  )
}

export default Notifications