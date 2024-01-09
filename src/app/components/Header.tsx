import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Mail, User, Bell, ChevronDown,Shield, Moon, ShoppingCart, Search, Home, Filter, Bookmark, ChevronRight} from 'react-feather';

const Header =({changNav} : any)=> {
  const [AccDD, setAccDD] = useState(false)
  const [NTDD, setNTDD] = useState(false)

  return (
    <>
    <div className="alerts"></div>
    <header>
      <b className="logo"> <FontAwesomeIcon icon={faBasketShopping} style={{width: 20, height: 20, marginRight: 5}} />  Store</b>
     
     <div className="search_container">
     <Search style={{width: 20, height: 20, marginLeft: 10, marginRight: 5}} /> 
      <input type='text' placeholder='Type your search...' />
     </div>
     
     
      <div className="right_nav">
      <div className='Icc' onClick={()=>{ setNTDD(!AccDD)
                                            AccDD === true ? setAccDD(false) : null
                                             }}  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', position: 'relative'}}>
      <Bell style={{width: 20, height: 20}}  /> 
      <div className="Red_dot"></div>
        </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', position: 'relative'}}>
      <ShoppingCart style={{width: 20, height: 20}} className='Icc' /> 
      {/* <div className="Red_dot"></div> */}
        </div>
     

        <div className='Icc' onClick={()=>{  setAccDD(!AccDD)
                                            NTDD === true ? setNTDD(false) : null
                                            }} 
                                          style={{width: 150, height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <User style={{width: 20, height: 20}} /> <p style={{fontSize: 13}}>Account</p> <ChevronDown style={{width: 20, height: 20}} />
        </div>
        
      <Moon style={{width: 20, height: 20}} className='Icc' /> 
      </div>

      {/* dropDown for the notifications */}
      {
        NTDD ?
        <div className="DropdownN">
        <div className="list"><p style={{marginLeft: 5,}}>new message</p></div>
        <div className="list"><p style={{marginLeft: 5,}}>new message</p></div>
        <div className="list"><p style={{marginLeft: 5,}}>new message</p></div>
        <p style={{fontSize: 10, color: 'teal', cursor: 'pointer', textDecoration: 'underline'}}>view all(21)</p>
      </div> : null
      }

      {/* dropDown for the account */}
      {
        AccDD ?
        <div className="DropdownA">
        {/* <div className="NAFY"> */}
          <div style={{background: `url(/illustrators/internet-safety-exploration.jpg) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minWidth: 180, minHeight: 180, backgroundSize: 'contain'}}></div>
        {/* </div> */}
        <p style={{fontSize: 12}}>You are not signed in</p>
        <br />
        <button>Sign-In</button>
        <br />
        {/* <p style={{fontSize: 10, color: 'teal', cursor: 'pointer', textDecoration: 'underline'}}>view all(21)</p> */}
      </div> : null
      }
    </header>
    </>
  )
}

export default Header
