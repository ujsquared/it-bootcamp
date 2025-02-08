'use client';
import React from 'react';
import Image from 'next/image';
import './notFound.css'; // Import the CSS file for styles

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-text">Page Not Found</h1>
            <Image 
                src="https://media.tenor.com/Mv-fBJTJj8sAAAAM/crying.gif"
                alt="Sad Man Meme"
                className="meme-image"
                width={200}
                height={200}
                unoptimized // Since we're using an external GIF
            />
        </div>
    );
};

export default NotFound;