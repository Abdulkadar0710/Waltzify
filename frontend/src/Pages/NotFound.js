import React from 'react';

const NotFound = () => {
    return (
        <div style={{ 
            marginTop: "15rem", 
            textAlign: "center", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center" 
        }}>
            <div style={{
                width: "200px",
                height: "200px",
                border: "5px solid  #ea5813  ",
                boxShadow: "0 0 0 5px black", // Outer orange border
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
            }}>
                <h1 style={{ fontSize: "3rem", margin: 0, color: "black", fontFamily:"monospace"}}>404</h1>
            </div>
            <h2 style={{ color: "black", fontSize: "1.3rem", fontFamily:"monospace"}}>OOPS! SOMETHING WENT WRONG</h2>
            <p style={{ color: "gray", fontSize: "1rem", marginBottom:"7rem",fontFamily:"monospace"}}>
            The page you are looking for doesn't exist.
            </p>
            
        </div>
    );
};

export default NotFound;
