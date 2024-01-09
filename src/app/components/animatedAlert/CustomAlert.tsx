import React, { useEffect, useState } from 'react'
import './cacss.css'
import { Animatedmessage } from './alertHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface props{
  text: string
}

const CustomAlert :React.FC<props> = ({text}) => {
  // const dialogue = new Animatedmessage;

  const [dur, setDur] = useState("closed")
  const [dialogue, setdialogue] = useState(new Animatedmessage)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDur("opened")
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);


  return (
    <div style={{
      minWidth: '100%', height: '100vh',
       position: 'fixed',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 5000,
       top: 0, alignSelf: 'center', left: 0, animationName: 'windowarea',
       animationDuration: '10s'
    }} className='WindowArea'>
        {/* 
                this is an custom alert window.
                a dot circle drops from the top center of the screen.
                the its width expands to 80% and max of 400px
                height of 5px thick
                a dropdown appears with a drop transition
                dialogue bg is white.
                message is in black text
                no buttons 
                lasts for 2sec max
                just to show a mesage.
         */}

         <div className="top_paddle" ></div> {/* thick*/}
         <div className="dialogue">
          <FontAwesomeIcon icon={faInfoCircle}  style={{width: 50, height: 50, color: 'blue'}}/>
          <br />
          <figcaption style={{fontSize: 10, width: '85%', textAlign: 'center'}}>
          {text} 
          </figcaption>
          {/* {Displaytime()} */}
          {/* {dialogue.alertNew("")} */}
         </div>
         <div className="bottomPaddle"></div> {/* thin*/}
    </div>
  )
}

export default CustomAlert
