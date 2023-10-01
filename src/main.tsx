import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import FirebaseService from './services/Firebase/Firebase';

const container = document.getElementById('root');
FirebaseService.init()
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);