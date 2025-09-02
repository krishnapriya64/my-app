/**
 * Entry point of the React application.
 * Imports React and ReactDOM to render the main App component into the DOM.
 * Also imports global styles and performance measuring utilities.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS styles
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals'; // Performance measuring utility

// Create root element to render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
