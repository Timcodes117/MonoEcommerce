
import React, { useEffect, useState } from 'react'
import '@/app/components/css/cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faArrowDown, faClose, faMinus, faPlus, faSort, faTrash } from '@fortawesome/free-solid-svg-icons'
import { WebStorage, cTar } from '../storage/Ls'
import PDetails from './PDetails';

function Cart() {
  const [CartItms, setCartItms] = useState<any[]>([])
  const [Storage, setStorage] = useState(new WebStorage)

  const [OpenDetail, setOpenDetail] = useState<any>(false);
  const [CurrentItem, setCurrentItem] = useState<any>({name: '', Image: '', Details: '', Price: '', List: ''});



  interface Len {
    length: number;
    selected: any
  }
  const RenderQauntity: React.FC<Len> = ({ length, selected }) => {
    for (var index = 0; index < length; index++) {
      // console.log(index++)
      return (
        <div className="list"><p style={{ marginLeft: 5, }} onClick={() => selected(index)}>{index + 1}</p></div>
      )
    }
  }
  
  const refresh = () =>{
    if("cartItems" in localStorage)
    setCartItms(cTar());
  }

  useEffect(() => {
    document.body.scrollTop = 0;
    Storage.validate()

    refresh()


    
    // console.log(CartItms, cTar(), 'cc')



    // prompt("add", "what do you want to add? ", )
    
  }, [])

  return (
    <>
      {/* <p style={{width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 10}}>Cart Items</p> */}
      <br />

      {
        !CartItms[0] ?
          <div className="contents">
            <div className="empty_hero">

            </div>
            <p style={{
              width: '100%', textAlign: 'center',
              fontSize: 10, marginTop: 20
            }}>Your cart is empty! come back when you have added more items.</p>
          </div>
          :
          <div className="contents">

            <table>
              <thead>
                <tr>
                  <td id='Hdd'>DATE</td>
                  <td>Preview</td>
                  <td>DETAILS</td>
                  {/* <td>Amount</td> */}
                  <td>ACTION</td>
                </tr>
              </thead>
              <tbody>

                {
                  CartItms.map((item, index)=>
                   (
                      <tr style={{ position: 'relative',  }} key={index}>
                  <td style={{ textAlign: 'center' }} id='Hdd'>{item.date}</td>
                  <td><div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', }}><div className="ImgPrev" onClick={()=> {
                    setCurrentItem(item);
                    setOpenDetail(!OpenDetail);
                  }} style={{background: `url(${item.image[0]})`, backgroundSize: 'cover', cursor: 'pointer'}}></div></div></td>
                  <td>
                    <strong style={{ fontSize: 40, textOverflow: 'ellipsis', flex: 1, maxWidth: 200}} id='NC'>{item.name}  </strong>
                    <p>$ {item.price}{item.amount > 1 ? ' ~ $'+ item.price * item.amount: null}</p>
                    <div style={{ width: 50, height: 50, background: 'none', marginLeft: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'relative' }}>
                      <div className="Counter" style={{ left: -20, }} onClick={()=>{
                                                                                         Storage.increment(CartItms, item.id)
                                                                                         refresh()
                                                                                        }}><FontAwesomeIcon icon={faPlus} color='white'  style={{width: 10, height: 10}}/></div>
                      <p style={{ fontSize: 20, color: 'black'}} onMouseDown={()=>{return false}}>{item.amount}</p>
                      <div className="Counter" style={{ right: -20, }} onClick={()=> {
                                                                                    if(item.amount > 1 ){
                                                                                      Storage.decrement(CartItms, item.id)
                                                                                      refresh()
                                                                                    }
                                                                                      // : null
                                                                                      }}><FontAwesomeIcon icon={faMinus} color='white' style={{width: 10, height: 10}} /></div>
                    </div>
                  </td>
                  {/* <td>
            </td> */}
                  <td >
                    {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,width: '100%',}}> */}
                    <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                      <div className="trash" onClick={()=> {
                                                            Storage.remove(CartItms, item.id);
                                                            refresh();
                                                            }}><FontAwesomeIcon icon={faTrash} color='red' /></div>

                    </div>
                    {/* </div> */}

                  </td>


                </tr>
                    )
                  )
                }

                

              </tbody>
            </table>
            
          
          </div>
      }

{
        OpenDetail ?
          <>
            <div className="closeBtn" onClick={() => setOpenDetail(!OpenDetail)} ><FontAwesomeIcon icon={faClose} beatFade style={{ width: 20, height: 20, }} /></div>
            <PDetails name={CurrentItem.name} id={CurrentItem.id} Image={CurrentItem.image} Details={CurrentItem.Details} Price={CurrentItem.price} List={CurrentItem.list} />
          </>
          : null
      }
    </>
  )
}

export default Cart