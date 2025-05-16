
import React, { useState, useEffect } from 'react';

const MyMap = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 600);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const mapStyle = isMobile
      ? { width: '100%', height: '15rem' }  // Styles for small screens
      : { width: '100%', height: '20rem' }; // Styles for larger screens
  
  
    return (
   
    <>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3629696502494!2d75.816413175081!3d22.677528079417083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdbf4a2b0e5d%3A0x934e6416008a72e2!2sWaltzer%20India!5e0!3m2!1sen!2sin!4v1726638903490!5m2!1sen!2sin"
    style={mapStyle}
     allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </>
    );
  }

export default MyMap;