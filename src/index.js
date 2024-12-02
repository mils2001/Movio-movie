import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MovieApp from './MovieApp'; // Import the updated MovieApp component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieApp />
  </React.StrictMode>
);

reportWebVitals();
