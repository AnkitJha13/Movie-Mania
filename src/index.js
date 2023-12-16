import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const container = document.getElementById('root'); // The root represents the entry point for rendering React components into the DOM. It takes the 'container' as an argument.
const root = ReactDOM.createRoot(container);

root.render(  // This line initiates the rendering process for the React application.
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
