import React from 'react';
import { Provider } from 'react-redux';

import App from './App.tsx';
import './index.css';
import { store } from './store/index.ts';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
