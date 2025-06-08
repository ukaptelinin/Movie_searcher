import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/globals.css';
import { App } from './app';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
