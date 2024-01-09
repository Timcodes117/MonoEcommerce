import React, { useState } from 'react'
import './css/Account.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleAlt, faEnvelope, faG, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Mail } from 'react-feather'
function Account() {

  const [userSI, setUSI] = useState<boolean>(false)

  interface Transaction {
    id? : any;
    date? : any;
    details? : any;
    amount? : any;
  }
  const [transactions, settransactions] = useState<Transaction[]>([])
  return (
    <div className='contents'>

      {
        userSI ?
        <>
        <div className="cover_Photo"></div>
      <div className="profile_Photo"></div>
      <label style={{marginLeft: 20, width: '90%', fontSize: 30}}>John Smith</label>
      <p style={{marginLeft: 20, fontSize: 10, width: '80%'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis dicta harum, dignissimos maiores sit modi, officia odio inventore corporis, reprehenderit voluptatibus quos distinctio nemo animi hic natus fugiat quas exercitationem!</p>
      <div className="data"></div>
      <br />
      <p style={{fontSize: 20, marginLeft: 20, color: 'teal', width: '100%'}}>Tansactions</p>
      {/* <br /> */}
      <p style={{width: '100%', textAlign: 'right', fontSize: 12, color: 'teal'}}>show all(21)</p>

        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Particular</td>
              <td>Amount</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>

          <tr>
            <td>JAN 13</td>
            <td>ITEMS</td>
            <td>2000</td>
            <td>-</td>
          </tr>
          <tr>
            <td>JAN 13</td>
            <td>ITEMS</td>
            <td>2000</td>
            <td>-</td>
          </tr>
          <tr>
            <td>JAN 13</td>
            <td>ITEMS</td>
            <td>2000</td>
            <td>-</td>
          </tr>
          </tbody>
        </table>
      
      <button type="button">Sign_out</button>
      </>
      :
      <div style={{width: '100%', flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <br />
        <br />
        <div id='sibg' style={{backgroundSize: 'contain', height: 250, width: '60%', animationName: 'imageILL', animationDuration: '1s',  }} ></div>
        <br />
        <b style={{color: '#212b3d', fontSize: 15, animationName: 'signInTxt', animationDuration: '1s', }}>Sign-in to your account!</b>
        <br />
      <div className="sibtn" style={{background: '#354663'}}>
        <Mail style={{width: 30, height: 30}} />
        <p>Continue with email & password</p>
      </div>
      {/* 212b3d */}
      <div className="sibtn" style={{background: '#354663'}}>
        {/* <FontAwesomeIcon icon={faG} style={{width: 30, height: 30}} />
        <a href="https://www.flaticon.com/free-icons/google" style={{width: 30, height: 30}} > </a> */}
        <div  className='glogo'/>
        <p>Continue with Google</p>
      </div>

      </div>
    }
    </div>
  )
}

export default Account