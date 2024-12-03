// import './index.css';
// import Navbar from './components/Navbar';
// import { Outlet } from 'react-router';
// import React, { useContext, useEffect } from 'react';
// import { ThemeContext } from './provider/AuthProvider';
// import Footer from './components/Footer';
// import Home from './components/Home';

// function App() {
//   const { theme } = useContext(ThemeContext); // Access the current theme

//   // Apply theme to the body or root element
//   useEffect(() => {
//     document.documentElement.className = theme;  // Apply to <html>
//     document.body.className = theme;  // Apply to <body>
//   }, [theme]);  // Re-run when theme changes

//   return (
//     <>
//       <div className={`app-container`}>
//         <Home />
//         <main>
//           <Outlet />
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;
