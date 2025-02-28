import React from 'react';

import App from './App.tsx';
import './index.css';
import '@/utils/i18n';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
