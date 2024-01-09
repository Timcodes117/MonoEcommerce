"use client"
import React, { useEffect, useState } from 'react'
import { type, } from 'os';
import { Mail, User, Bell, ChevronDown, Shield, Moon, ShoppingCart, Search, Home, Filter, Bookmark, ChevronRight, Heart, Layers } from 'react-feather';
// import './index.css'
import db from '../firebase.config'
import Carousel from '../carousel/carousel';
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import Header from '../components/Header';
import { Menu } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesRight, faArrowRight, faClose, faGamepad, faGlasses, faHeart, faHome, faKitMedical, faPersonRunning, faShoppingCart, faTshirt, faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import HorizontalList from './HorizontalList';
import { MoonLoader } from 'react-spinners';
import PDetails from './PDetails';
import CustomAlert from './animatedAlert/CustomAlert';
import { Animatedmessage } from './animatedAlert/alertHook';

const Homepage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [current_category, setcurrent_category] = useState<string>('ALL');
  const [ActiveNavTab, setActiveNavTab] = useState<string>('Home');
  const [Calert, setCalert] = useState(new Animatedmessage);
  const [windowVis, setVisiblity] = useState(false)
  const [OpenDetail, setOpenDetail] = useState<any>(false);
  const [ProductData, setProductData] = useState<any[]>([{}]);
  const [productsViewcount, setproductsViewcount] = useState<any>(0);
  const [FP, setFP] = useState<any[]>([]);
  const [TA, setTA] = useState<any[]>([{ id: 'lndk', name: 'payday' }, { id: 'yshdw', name: 'daype' }, { id: 'nakjd', name: 'monei' }]);
  // var rng = new Range()


  interface PDt { name: string, images: string, Category: string, Price: string, List: string, details: string }

  const images = [
    { uri: '/images/redNike.jpg', has_fi: true },
    { uri: '/images/infibg.jpg', has_fi: false },
    // {uri: '/images/tshirts.webp', has_fi: false},
    { uri: '/images/watches.webp', has_fi: false },
    { uri: '/images/lpbg2.png', has_fi: false },
    { uri: '/images/iphonebg.png', has_fi: false },
    { uri: '/images/samsungbg.jpg', has_fi: false },
    // Add more image URLs as needed
  ];

  const textArray = [
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const categories = [
    'ALL',
    'WEARS',
    'ACCESSORIES',
    'SPORTS',
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

  const get = async () => {

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      function onsnaphot(s: any = doc.data()) {
        // alert(JSON.stringify(s))
        setProducts(prev => [...prev, s])
        // setFP(prev => [prev, prev.filter(item => item.Category === current_category)])
        // FilteredProducts()
        console.log(FP)
      }

      return onsnaphot()
    });


  }

  const FilteredProducts = () => {
    console.log('=> newArray ', FP)
  }

  const HandlePD = (ndata: any) => {
    setProductData([...ndata])
    console.log(ProductData)
    setOpenDetail(!OpenDetail)
  }


  useEffect(() => {
    const filteredProducts = products.filter(product => product.Category === current_category);

    // Update the filtered products in the state using setFP()
    setFP(filteredProducts);

  }, [current_category])

  // (function(){
  //   if(products){

  //     setproductsViewcount(Math.ceil(products.length / 5))
  //     console.log(productsViewcount)
  //   }
  //   })()

  useEffect(() => {
    get();
    // FilteredProducts()
    
  }, [])
  
  useEffect(()=>
  {
    
    const interval = setInterval(() => {
      setVisiblity(Calert.isVisible)
      
      console.log("new "+ Calert.isVisible + windowVis)

      windowVis ? setOpenDetail(!OpenDetail) : console.log('') 
      
    }, 5000);
    
    Calert.alertNew("hello", "success")
    
    return () => clearInterval(interval);
    
  },[])

  return (
    <div className="contents">
      {/* <br /> */}
      <p style={{ fontSize: 20, width: '90%', marginLeft: 20, color: '#323232', animationName: 'wb', animationDuration: '1s', }} >Welcome back,</p>
      <p style={{ fontSize: 15, width: '90%', marginLeft: 20, color: '#323232', animationName: 'wb', animationDuration: '5s',  }} > <User style={{ width: 15, height: 15, marginRight: 5 }} /> Timothy</p>
      <br />
      <p style={{ fontSize: 10, color: '#323232', width: '90%', marginLeft: 20, display: 'flex', alignItems: 'center' }} ><span style={{ color: '#04b6b6' }}>HOME</span> <ChevronRight style={{ width: 15, height: 15 }} /> {current_category} </p>
      <br />
      <div className="categories">
        {
          categories.map((category: any, index) => {
            return (
              <div className={category === current_category ? "category chosen_cate" : "category"} key={index} style={{ animationName: 'ct', animationDuration: `${(index*1.5)+1}s`, }} onClick={() => setcurrent_category(category)}>

                {category === 'ALL' ? <Layers style={{ width: 15, height: 15, marginRight: 10 }} /> : <></>}
                {category === 'WEARS' ? <FontAwesomeIcon icon={faTshirt} style={{ width: 15, height: 15, marginRight: 10 }} /> : <></>}
                {category === 'ACCESSORIES' ? <FontAwesomeIcon icon={faGlasses} style={{ width: 15, height: 15, marginRight: 10 }} /> : <></>}
                {category === 'SPORTS' ? <FontAwesomeIcon icon={faPersonRunning} style={{ width: 15, height: 15, marginRight: 10 }} /> : <></>}
                {category === 'GAMING' ? <FontAwesomeIcon icon={faGamepad} style={{ width: 15, height: 15, marginRight: 10 }} /> : <></>}
                {category === 'ELECTRONICS' ? <FontAwesomeIcon icon={faTv} style={{ width: 15, height: 15, marginRight: 10 }} /> : <></>}
                {category}</div>
            )
          })
        }
      </div>
      <br />
      {
        current_category === 'ALL' ?
          <Carousel images={current_category === 'ALL' ? images : images} texts={textArray} />
          : null
      }
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

        {
          current_category === 'WEARS' ?
            <div className="chView" style={{ background: `linear-gradient(to top, #00000080, #00000000), url(./images/tshirts.webp)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <strong style={{ fontSize: 30, color: 'white' }}>{current_category}</strong>
            </div>
            : null
        }

        {
          current_category === 'ACCESSORIES' ?
            <div className="chView" style={{ background: `linear-gradient(to top, #00000080, #00000000), url(/images/bag.jpg)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <strong style={{ fontSize: 30, color: 'white' }}>{current_category}</strong>
            </div>
            : null
        }
        {
          current_category === 'SPORTS' ?
            <div className="chView" style={{ background: `linear-gradient(to top, #00000080, #00000000), url(/images/1930_sports-equipment.jpg)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <strong style={{ fontSize: 30, color: 'white' }}>{current_category}</strong>
            </div>
            : null
        }

        {
          current_category === 'GAMING' ?
            <div className="chView" style={{ background: `linear-gradient(to top, #00000080, #00000000), url(/images/SPDGM.jpg)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <strong style={{ fontSize: 30, color: 'white' }}>{current_category}</strong>
            </div>
            : null
        }

        {
          current_category === 'ELECTRONICS' ?
            <div className="chView" style={{ background: `linear-gradient(to top, #00000080, #00000000), url(/images/Ele.jpg)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <strong style={{ fontSize: 30, color: 'white' }}>{current_category}</strong>
            </div>
            : null
        }
      </div>
      <br />
      <br />
      <>
        {
          FP.map((p, index) => {
            // if(p.Category === current_category )
            // return(
            <b>arr
              {p}
              {index}
            </b>
            // )
          })
          // FP[0]
        }
      </>

      {
        !products[0] ?
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {!products[0] ? <MoonLoader color='teal' size={50} /> : null}
            <br />
            <p style={{ fontSize: 10 }}>please wait while we fetch more products</p>
          </div>
          : null
      }

      <HorizontalList products={current_category === 'ALL' ? products : FP} current_category={current_category} clickPush={(data: any) => HandlePD(data)} />
      <br />
      <br />
      {/* <Carousel images={images} texts={textArray} /> */}
      <br />
      <br />
      {
        OpenDetail ?
        <>
          <div style={{position: 'relative', width: '85%', height: '90vh', flex: 1, display: 'flex', background: 'red'}}>
            <div className="closeBtn" onClick={() => setOpenDetail(!OpenDetail)} ><FontAwesomeIcon icon={faClose} beatFade style={{ width: 20, height: 20, }} /></div>
            <PDetails name={ProductData[0].name} Image={ProductData[0].images} id={ProductData[0].id} Details={ProductData[0].details} Price={ProductData[0].Price} List={ProductData[0].List} />
          </div>
        </>
          : null
      }

      <div className="GtCart">
        <FontAwesomeIcon icon={faShoppingCart} style={{width: 30, height: 30, color: 'white'}} />
        <div className="TII">{0}</div>
      </div>
      {
        windowVis === true ?
        <CustomAlert text={Calert.messages} />
        : null

      }
    </div>

  )
}

export default Homepage