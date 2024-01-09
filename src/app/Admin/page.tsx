"use client"
import React, {useState, useEffect} from 'react'
import { faAngleRight, faCheckCircle, faDotCircle, faPaperPlane, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './admin.css'
import {ref as sref} from 'firebase/storage'
import { set, ref, onValue, remove, update } from "firebase/database";
import db, { storage } from '../firebase.config'
import {uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const page :React.FC = () => {
    const [imageurl, setImageurl] = useState<any[]>([])
    const [fileChooser, setfileChooser] = useState<any[]>([])
    const [file, setFile] = useState<any>([]);
    const [percent, setPercent] = useState(0);
    const [count, setCount] = useState<number>(0);
    const [selectedValue, setSelectedValue] = useState<string>('WEARS');
    const [chiuad, setchiuad] = useState('');
    const [listings, setlistings] = useState<any[]>([]);
    const [newLT, setnewLT] = useState<string>('[]');




    // product datas
    const [Pname, setPname] = useState<any>('');
    const [Pprice, setPprice] = useState(0);
    const [Ptax, setPtax] = useState(0);
    const [gh, setgh] = useState("");
    const [Pdetails, setPdetails] = useState("");




    interface newFile {
        fileUrl: any
    }

    const pushImageUrl = (newFile : any) =>{
        setfileChooser(prev => [...prev, newFile])
    }

    function handleChange(event :any) {
        setfileChooser(prev => [...prev, event.target.files[0]])
        setFile(event.target.files[0]);
    }

    const handleUpload = (newTmb : any) => {
        
        const storageRef = sref(storage, `/products/${newTmb.name}`);
     
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the newTmb to upload.
        const uploadTask = uploadBytesResumable(storageRef, newTmb);
        
        uploadTask.on(
           "state_changed",
           (snapshot) => {
               const percent = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
           );
           
           // update progress
           setPercent(percent);
           },
           (err) => console.log(err),
           () => {
               // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageurl(prevUrl => [...prevUrl, url])
            setStates()
            console.log(url);
            // writeToDatabase(url)
            // console.log(count,imageurl.length, fileChooser.length)
            setCount(prevCount => prevCount + 1)
            console.log(count, 'uploading...')
            if(imageurl.length === fileChooser.length){
                setchiuad('pop')
                console.log('done ' + count)
                // alert('done')
            }else{
                console.log(count)
            }
            
            
        });
    }
    );
};

const getReady = () =>{
    fileChooser[0] ?
    fileChooser.forEach((filed, index)=>{
        handleUpload(filed)
    })
    : alert('no image found')
}

const setStates =()=>{
    // setCount(prevCount => prevCount + 1)
    
        console.log(count,imageurl.length, fileChooser.length)
    }

    const HandleListings = (value: string) =>{
        setlistings(prevLists => [...prevLists, value])
        setnewLT('')
    }
    
    
    interface productInfos {
    url?: string,
    name?: string,
    price?: string,
    tax?: string,
    detail?: string,
    amount?: string,
    id?: string,
   }

   const redP = (index : any) =>{

   }
   const addProduct = async (url: any, name: any, price: any, tax: any, detail: any) => {
       setgh('load')
    const myUuid = uuidv4();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: name,
        Price: price,
        Details: detail,
        Tax: tax,
        Category: selectedValue,
        image: url,
        id: myUuid,
        List: listings,
        units: 20
      });
      console.log("Document written with ID: ", docRef.id);
      alert('Upload was successful. ID: ' + docRef.id);
      location.reload()
    } catch (error: any) {
      console.error("Error adding document: ", error);
      alert("Error adding document: " + error);
    }
  };


  function handleSelectChange(value : string)  {
            setSelectedValue(value);
            console.log('Selected value:', value);
        // const value = event.target.value;
      };

      
      useEffect(()=>{
        if(imageurl.length === fileChooser.length && fileChooser.length > 0){
            console.log('done ' + count)
        }else{
            console.log(count)
        }
      }, [imageurl])

      useEffect(()=>{
        if(imageurl.length === fileChooser.length && fileChooser.length > 0){
        addProduct(imageurl, Pname, Pprice, Ptax, Pdetails)
        }
      }, [imageurl])



  return (
    <div className='Fc'>
    <div className='form'>
        
        <div className="Horirow" style={{justifyContent: 'flex-start'}}>
            {
                fileChooser && fileChooser.map((itm, id:any)=>{
                    return (
                             <div className="selectedCheck" key={id}>
                             <FontAwesomeIcon icon={faCheckCircle} style={{width: 40, height: 40, color: 'white'}} />
                             <input type="file" onChange={handleChange}  accept="/image/*" />
                             </div>
                             
                        )
                })
            }
            <div className="AddImage">
                <FontAwesomeIcon icon={faPlus} style={{width: 40, height: 40}} />
                <input type="file" onChange={handleChange}  accept="/image/*" />
            </div>
        </div>
        
        <div className="Horirow">

        <fieldset>
            <legend>Name</legend>
            <input type="text" value={Pname} placeholder='    product name'  onInput={e => setPname(e.target.value)}/>
        </fieldset>

        <fieldset>
            <legend>Price</legend>
            <input type="text" placeholder='    product price' onInput={e => setPprice(e.target.value)}/>
        </fieldset>
        </div>

{/* second row */}
        <div className="Horirow">

        <fieldset>
            <legend>Category</legend>
            <select name="cate" value={selectedValue} onChange={(e) => handleSelectChange(e.target.value)}>
              <option value="WEARS">WEARS</option>
              <option value="ACCESSORIES">ACCESSORIES</option>
              <option value="SPORTS">SPORTS</option>
              <option value="GAMING">GAMING</option>
              <option value="ELECTRONICS">ELECTRONICS</option>
            </select>
        </fieldset>

        <fieldset>
            <legend>vat</legend>
            <input type="text" placeholder='    value added tax' onInput={e => setPtax(e.target.value)}/>
        </fieldset>
        </div>
        <br />
{/* Details row */}
        <div className="Horirow" style={{justifyContent: 'center',display: 'flex', alignItems: 'center'}}>
           <textarea name="" id="" placeholder='    details of the product' onInput={e => setPdetails(e.target.value)}></textarea>
        </div>
        <br />
        {
            listings[0] && listings.map((data, index)=>{
                return(

                         <div className="listView">
                        <FontAwesomeIcon icon={faDotCircle} style={{width: 10, height: 10, margin: 20}} /> 
                        <p>{data}</p>
                        <button><FontAwesomeIcon icon={faTrash} style={{width: 20, height: 20, color: 'red'}} /></button>
                        </div>
                    )
            })

        }

        <div className="listView" style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesomeIcon icon={faAngleRight} style={{width: 20, height: 20, margin: 20}} /> 
            <input type="text" value={newLT} name="" id="" placeholder='enter a new list' onChange={(t)=> setnewLT(t.target.value)} />
            <button onClick={()=> HandleListings(newLT)}><FontAwesomeIcon icon={faPaperPlane} style={{width: 20, height: 20, color: 'teal'}} /></button>
        </div>

        <br />
        <p>{gh} {imageurl.length} {fileChooser.length} {selectedValue} {Pname}</p>
        <p>{percent}</p>
        <br />

        <button type="submit" onClick={getReady}>Upload</button>
    </div>
    </div>
  )
}

export default page
