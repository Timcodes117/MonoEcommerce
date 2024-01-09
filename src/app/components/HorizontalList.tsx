"use client"
import React, {useEffect, useState} from 'react'
import { type,  } from 'os';
import { Mail, User, Bell, ChevronDown,Shield, Moon, ShoppingCart, Search, Home, Filter, Bookmark, ChevronRight, Heart, Layers} from 'react-feather';
// import './index.css'
import db from '../firebase.config'
import Carousel from '../carousel/carousel';
import { collection, getDocs } from "firebase/firestore"; 
import { doc, getDoc } from "firebase/firestore";
import Header from '../components/Header';
import { Menu } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesRight, faArrowRight, faGamepad, faGlasses, faHeart, faKitMedical, faTshirt, faTv } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  // Add other product properties as needed
}

interface HorizontalListProps {
  products: any[];
  current_category: any;
  clickPush: any
}

const HorizontalList: React.FC<HorizontalListProps> = ({ products, current_category, clickPush }) => {
  const numRows = Math.ceil(products.length / 5);
  const [randP, setrandP] = useState(Math.floor(Math.random() * products.length));

  
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * products.length);
      setrandP(newIndex);
      console.log(randP)
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [products]);

  const renderRows = () => {
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const startIndex = i * 5;
      const endIndex = Math.min(startIndex + 5, products.length);
      const rowProducts = products.slice(startIndex, endIndex);

      const row = (
          <>
    <div className='bc' key={i} style={{position: 'relative', display: 'flex', alignItems: 'center', width: '120%', overflow: 'hidden', marginLeft: -70}}>
        <div  className="pView">
          <div className='Pmargin' style={{minWidth: 50, height: 210, display: 'none' }}></div>
          {rowProducts.map((itm : any, id) => (
              <>
              {/* { */}
                 {/* current_category === 'ALL' ? */}
                <div className='Product' key={itm.id} onClick={()=> clickPush([{id: itm.id, name: itm.name, images: itm.image, Category: itm.Category, Price: itm.Price, List: itm.List, details: itm.Details}])}>
              
              <div className="Pimg" style={{background: `url(${itm.image[0]})`, backgroundSize: 'cover'}}></div>
              <div className="pInfo">
              <figcaption style={{fontSize: 20, marginLeft: 10, wordWrap: 'break-word', lineBreak: 'anywhere', width: '90%', fontWeight: 'bolder', color: 'whitesmoke'}}>{itm.name}</figcaption>
              <p style={{fontSize: 15, marginLeft: 10, color: 'white'}}>${itm.Price}</p>
              <br />
                 <div className="fav">
                
                <Heart style={{width: 20, height: 20, color: 'white'}}/>
              </div>
              </div>
    
            </div>             
             
            </>
          ))}
        </div>
        <div className="prev" style={{left: 0}}>
        <FontAwesomeIcon icon={faAngleLeft} style={{width: 20, height: 20}}  />
      </div>
      <div className="next">
        <FontAwesomeIcon icon={faAngleRight} style={{width: 20, height: 20}} />
      </div>
    </div>
    {
      i % 2 ?
      <div style={{marginLeft: -70, position: 'relative', display: 'flex', alignItems: 'center', width: '120%', overflow: 'hidden', }}>

      <div className='chView' style={{width: '120%', height: 200, background: `linear-gradient(to top, #00000099, #00000099), url(${products[randP] ?  products[randP].image[0]: products[0].image[0]})`, backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
        <>
          <label htmlFor="" style={{marginLeft: 10, color: 'white', fontSize: 30, width: '60%'}}>{products[randP] ? products[randP].name : products[0].name}</label>
          <button style={{cursor: 'pointer'}}>Buy<FontAwesomeIcon icon={faArrowRight} shake style={{marginLeft: 10}} /> </button>
          <br />
         <div className="off">-5% off</div>
          </>
      </div> 
      </div>
      : null
    }
          </>
      );

      rows.push(row);
    }

    return rows;
  };

  return <div className="horizontal-list">{renderRows()}</div>;
};

export default HorizontalList;
