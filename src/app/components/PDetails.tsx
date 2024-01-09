"use client"
import React, {useState, useEffect} from 'react'
import { fa0, faBasketShopping, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Star } from 'react-feather'
import { AddToCart, WebStorage, cTar } from '../storage/Ls'
import { Animatedmessage } from './animatedAlert/alertHook'
import CustomAlert from './animatedAlert/CustomAlert'

// function Cart() {
  
  interface ProductDetails {
    id: any,
    name: String,
    Image: string[],
    Details: string,
    Price: any,
    List: String[],
}
  const PDetails: React.FC<ProductDetails> = ({id, name, Image, Details, Price, List}) => {
    const [ImgIndex, setImgIndex] = useState<number>(0)
    
      const [CartItms, setCartItms] = useState<any[]>([])
      const [exist, setexist] = useState<boolean>(false)
      const [Storage, setStorage] = useState(new WebStorage)
  const [windowVis, setVisiblity] = useState(false)
      const [Calert, setCalert] = useState(new Animatedmessage)
    
      const refresh = () =>{
        let ct: any = localStorage.getItem("cartItems");
        ct = JSON.parse(ct)
        setCartItms(ct)
        // 0
        if("cartItems" in localStorage)
        // setCartItms(cTar());
        check(id, ct)
      }
      
      const check=(nid: any, ct: any)=>{
        let array = ct;
        // console.log(array)

        for (let index = 0; index < array.length; index++) {
          // alert("aa"+ array[index])
          if (array[index].id === nid) {
            // alert(exist+ nid)
            setexist(true)
            console.log(id)
            // alert("true")
            break
          }else{
            setexist(false)
            // break
            // alert(exist)
          }
        }
      }

      // check(id)
    
      useEffect(() => {
        Storage.validate()
        refresh()
        document.body.scrollTop = 0;
    
        // check(id)
        // alert(CartItms[0].id)
        
    
    
      }, [])

      useEffect(()=>
      {
        
        const interval = setInterval(() => {
          setVisiblity(Calert.isVisible)
          console.log("new "+ Calert.isVisible + windowVis)
          
        }, 5000);
        
        // Calert.alertNew("hello", "success")
        
        return () => clearInterval(interval);
        
      },[])
    
    
  return (
    <>
    {/* preview */}
    <div className="shadow">
      <div className="preview_container">
        <br />
        <div className="top_section">

        <div className="left_prev">

        <div className="thumnail_prev">  
        <br />
        <br />
        <br />
        {
          Image.map((img, index)=>{
            return(
              <div className="tiles" onClick={()=> setImgIndex(index)} style={{background: `url(${img})`, backgroundSize: 'cover', backgroundColor: 'gainsboro', opacity: index === 0 ? 1 : 0.8}}></div>
            )
          })
        }
        
        </div>
          <div className="tmbn">
            <div className="img" style={{background: `url(${Image[ImgIndex]})`, backgroundSize: 'cover', scale: 1.5, backgroundColor: 'gainsboro'}}></div>
          </div>
        </div>
        <div className="product_info">
          <br />
          <br />
            <br />
            <br />
          <div className="stars" style={{marginLeft: 10}}>
            <FontAwesomeIcon icon={faStar} style={{width: 20, height: 20, color: 'red'}} />
            <FontAwesomeIcon icon={faStar} style={{width: 20, height: 20, color: 'red'}} />
            <FontAwesomeIcon icon={faStar} style={{width: 20, height: 20, color: 'red'}} />
            <Star style={{width: 20, height: 20, color: 'red'}} />
            <Star style={{width: 20, height: 20, color: 'red'}} />
            </div>
            <br />
          <strong id="pname" style={{fontSize: 50, width: '70%', marginLeft: 10}}>{name}</strong>
          <p style={{fontSize: 10, marginTop: 5, width: '70%', marginLeft: 10}}>{Details}</p>
          <br />
          {/* <div className="rate" style={{marginLeft: 10}}><FontAwesomeIcon icon={faStar} style={{width: 20, height: 20, color: 'orangered'}} /> 4.8 </div> */}
          <br />
          <div className="priceTag" style={{fontFamily: 'sans-serif'}}><span style={{fontSize: 40}}> $</span>{Price}</div>
          <br />
              <p style={{width: '100%', marginLeft: 10}}>Included:</p>
          <br />
          <div style={{margin: 10}}>
            <ul>
              {
                List.map((List, index)=>{
                  return(
                    <li style={{listStyle: 'square', marginTop: 5, color: 'orangered'}} >{List}</li>
                  )
                })
              }
            </ul>
          </div>
          <br />
          <div className="center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63416.019734404406!2d3.346014968539308!3d6.584442150452086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa2a3999%3A0xd7a8324bddbba1f0!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1687880287782!5m2!1sen!2sng"   allowFullScreen={false} className='map' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <br />
          <button className="addBtn" style={exist ? {background: 'grey'} : {}} onClick={()=>
          {
            Calert.alertNew("added to cart", "success")
            !exist ? AddToCart(CartItms, {id: id, name: name, price: Price, url: Image, list: List, Details: Details}) : null
          }
             }>
             <FontAwesomeIcon icon={faBasketShopping} style={{width: 20, height: 20, color: 'white', marginRight: 10}} /><p>{exist ? "item has been added" : "ADD TO CART"}</p>
             </button> 
             <br />
          </div>
             <br />
             <br />

        </div>
        </div>
      </div>
    </div>
    {
        windowVis === true ?
        <CustomAlert text={Calert.messages} />
        : null

      }
    </>
  )
}

export default PDetails
