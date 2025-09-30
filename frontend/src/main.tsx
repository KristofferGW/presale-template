import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import Providers from './components/Providers';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
