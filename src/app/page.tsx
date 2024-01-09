"use client"
import { type,  } from 'os';
import React, { useEffect, useState } from 'react'
import { Mail, User, Bell, ChevronDown,Shield, Moon, ShoppingCart, Search, Home, Filter, Bookmark, ChevronRight, Heart, Star} from 'react-feather';
import './index.css'
import db from './firebase.config'
import Carousel from './carousel/carousel';
import { collection, getDocs } from "firebase/firestore"; 
import { doc, getDoc } from "firebase/firestore";
import Header from './components/Header';
import { Menu } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faGamepad, faGlasses, faHeart, faHome, faKitMedical, faStar, faTshirt, faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import Homepage from './components/Home';
import Cart from './components/Cart';
import Saved from './components/Saved';
import Notifications from './components/Notifications';
import Account from './components/Account';
import Discover from './components/Discover';

function page() {
  
  const [products, setProducts] = useState<any[]>([]);
  // const [current_category, setcurrent_category] = useState<string>('ALL');
  const [ActiveNavTab, setActiveNavTab] = useState<string>('Home');

  const images = [
    {uri:'/images/shoe.jpg', has_fi: true},
    // {uri: '/images/pexels-tembela-bohle-1884583.jpg', has_fi: false},
    {uri: '/images/cloth.jpg', has_fi: false},
    {uri: '/images/bag.jpg', has_fi: false},
    // Add more image URLs as needed
  ];

  const textArray = [
    'Shoes',
    'Cloth',
    'Bags',
    'Bags',
  ];

  const categories = [
    'ALL',
    'WEARS',
    'ACCESSORIES',
    'HEALTH',
    'GAMING',
    'ELECTRONICS',
  ];

  const Nav = [
    'Home',
    'Cart',
    'Saved',
    'Notification',
    'Account',
    // 'ELECTRONICS',
  ];
  
  const get = async ()=>{

    const querySnapshot = await getDocs(collection(db, "shoes"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      function onsnaphot(s:any = doc.data()){
        // alert(JSON.stringify(s))
      
        setProducts(prev => [...prev, s])
        console.log(products)
      }
      
      return onsnaphot()
    });

    
}


  useEffect(()=>{
    get()
  },[])
  return (
    <>
    <Header />    
    <div className="store">
      <div className="sideNav">
        {/* navbar props */}
        <nav>
          <div style={{display: 'flex', marginTop: 50, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%'}}>
<br />

          <div className='Tabs' onClick={()=> setActiveNavTab('Home')} style={ActiveNavTab === 'Home'? {color: 'white',  fontSize: 10, background: '#04b6b6', borderRadius: 20} : {}}> <Home style={{width: 20, height: 20, marginLeft: 12, marginRight: 20}} /> <a >Home</a></div>
          <div className='Tabs' onClick={()=> setActiveNavTab('Cart')} style={ActiveNavTab === 'Cart'? {color: 'white',  fontSize: 10, background: '#04b6b6', borderRadius: 20} : {}}> <ShoppingCart style={{width: 20, height: 20, marginLeft: 12, marginRight: 20}} /> <a >Cart</a></div>
          <div className='Tabs' onClick={()=> setActiveNavTab('Discover')} style={ActiveNavTab === 'Discover'? {color: 'white',  fontSize: 10, background: '#04b6b6', borderRadius: 20} : {}}> <Search style={{width: 20, height: 20, marginLeft: 12, marginRight: 20}} /> <a >Discover</a></div>
          <hr />  
          <div className='Tabs' onClick={()=> setActiveNavTab('Saved')} style={ActiveNavTab === 'Saved'? {color: 'white',  fontSize: 10, background: '#04b6b6', borderRadius: 20} : {}}> <Bookmark style={{width: 20, height: 20, marginLeft: 12, marginRight: 20}} /> <a >Saved</a></div>
          <div className='Tabs' onClick={()=> setActiveNavTab('Notification')} style={ActiveNavTab === 'Notification'? {color: 'white',  fontSize: 10, background: '#04b6b6', borderRadius: 20} : {}}> <Bell style={{width: 20, height: 20, marginLeft: 12, marginRight: 20}} /> <a >Notifications</a></div>
          <div className='Tabs' onClick={()=> setActiveNavTab('Account')} style={ActiveNavTab === 'Account'? {color: 'white',  fontSize: 10, background: '#04b6b6', borderRadius: 20} : {}}> <User style={{width: 20, height: 20, marginLeft: 12, marginRight: 20}} /> <a >Account</a></div>

          </div>
        </nav>
      </div>

      <div className="centeredDiv">
        
        {
          ActiveNavTab === 'Home' ?
             <Homepage />
          : null
        }

        {
          ActiveNavTab === 'Cart' ?
             <Cart />
          : null
        }

        {
          ActiveNavTab === 'Saved' ?
             <Saved />
          : null
        }
        {
          ActiveNavTab === 'Discover' ?
             <Discover />
          : null
        }

        {
          ActiveNavTab === 'Notification' ?
             <Notifications />
          : null
        }
        {
          ActiveNavTab === 'Account' ?
             <Account />
          : null
        }

      </div>

      <div className="SideAds">

      </div>
    </div>


    <div className="Mobilefooter">

<div className="MFView">

<div className="MFIcon" style={ActiveNavTab === 'Home' ? {background: '#04b6b633',}: {}} onClick={()=> setActiveNavTab('Home')}>
  <FontAwesomeIcon icon={faHome} style={ ActiveNavTab === 'Home' ? {color: 'white'} : {color: 'grey'}} className='FIc'/>
</div>
  <p style={{margin: 5, fontSize: 10, color: 'black'}} onClick={()=> {return false}}>Home</p>
</div>

<div className="MFView">

<div className="MFIcon" style={ActiveNavTab === 'Account' ? {background: '#04b6b633',}: {}} onClick={()=> setActiveNavTab('Account')}>
  <FontAwesomeIcon icon={faUser} style={ ActiveNavTab === 'Account' ? {color: 'white'} : {color: 'grey'}} className='FIc'/>
</div>
  <p style={{margin: 5, fontSize: 10, color: 'black'}} onClick={()=> {return false}}>Account</p>
</div>

</div>

    
    </>
  )
}

export default page
