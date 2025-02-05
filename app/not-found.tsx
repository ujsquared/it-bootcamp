'use client';
import React from 'react';
import './notFound.css'; // Import the CSS file for styles

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-text">Page Not Found</h1>
            <img 
                src="https://media.tenor.com/Mv-fBJTJj8sAAAAM/crying.gif" // Replace with the Sad Man GIF URL
                alt="Sad Man Meme"
                className="meme-image"
            />
        </div>
    );
};

export default NotFound;