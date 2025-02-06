// import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { Helmet } from 'react-helmet';

// const Container = styled.div`
//   background-color: black;
//   width: 342px;
//   margin: 0 auto;
//   font-family: sans-serif;
// `;

// const Title = styled.h1`
//   font-family: 'Permanent Marker', cursive;
//   text-align: center;
//   color: yellow;
// `;

// const Message = styled.p`
//   color: #0000ff;
//   text-align: center;
//   margin: 20px 0;
// `;

// const PacmanWrapper = styled.div`
//   height: 470px;
//   width: 382px;
//   border-radius: 5px;
//   margin: 20px auto;
// `;

// const PacmanGame: React.FC = () => {
//   const pacmanRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Load external scripts dynamically
//     const loadScript = (src: string) => {
//       return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = src;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.body.appendChild(script);
//       });
//     };

//     const initializeGame = async () => {
//       try {
//         await loadScript('https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js');
//         await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js');
        
//         if (pacmanRef.current && window.PACMAN) {
//           window.PACMAN.init(
//             pacmanRef.current,
//             'https://raw.githubusercontent.com/daleharvey/pacman/master/'
//           );
//         }
//       } catch (error) {
//         console.error('Error loading scripts:', error);
//       }
//     };

//     initializeGame();

//     return () => {
//       // Cleanup if needed
//     };
//   }, []);

//   return (
//     <Container>
//       <Helmet>
//         <title>Maintenance - Moota.co</title>
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css?family=Permanent+Marker"
//         />
//       </Helmet>

//       <div 
//         id="shim" 
//         style={{
//           fontFamily: 'Permanent Marker',
//           position: 'absolute',
//           visibility: 'hidden'
//         }}
//       >
//         shim for font face
//       </div>

//       <Title>Maintenance</Title>
//       <Message>
//         Sedang migrasi server dan upgrade engine 23:00 s/d 05:00. Mohon doanya :
//       </Message>
      
//     </Container>
//   );
// };

// export default PacmanGame;
// components/PacmanGame.tsx
import React from 'react';

const PacmanGame = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/index.html"
        className="w-full h-full border-0"
        title="Pacman Game"
        allowFullScreen
      />
    </div>
  );
};

export default PacmanGame;