import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '../node_modules/primereact/resources/themes/arya-blue/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';

import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
