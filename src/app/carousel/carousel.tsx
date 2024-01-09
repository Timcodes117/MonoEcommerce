"use client"
import { faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

type CarouselProps = {
  images: any[];
  texts: string[];
};

const Carousel: React.FC<CarouselProps> = ({ images, texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // useEffect(()=>{
  // React.useCallback(
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 10000);
  
      return () => clearInterval(interval);
    }, [images.length]);
  
      // )
    // }, [])
    // clearInterval()

  return (
    <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
    <div className="carousel Hero">
      <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ background: 'whitesmoke',backgroundImage: `url(${image.uri})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            
          >
        
              <div style={{width: '95%', maxWidth: 600, color: 'whitesmoke', display: 'flex', flexDirection: 'column', marginLeft: 15}}>
            
              {
                texts[index] ?
                <>
                <strong style={{fontSize: 50, color: 'white',}}>{texts[index]}</strong>
              {/* <label style={{color: 'whitesmoke', fontSize: 12}}> latest fashion trends, cutting-edge electronics, stylish home decor, or unique gifts, we have something for everyone. Browse our extensive collection, read customer reviews, and make your purchase with confidence. Enjoy secure payment options and fast shipping to your doorstep. </label> */}
                </>
                 : ''
              }

              </div>
            
          </div>
        ))}
      </div>
      <div className="prev" onClick={handlePrev}>
        <FontAwesomeIcon icon={faAngleLeft} style={{width: 20, height: 20}}  />
      </div>
      <div className="next" onClick={handleNext}>
        <FontAwesomeIcon icon={faAngleRight} style={{width: 20, height: 20}} />
      </div>
    </div>
    {images[currentIndex].has_fi
    ?
<div className="overImg"></div> : ''
    }
    
        </div>
  );
};

export default Carousel;