import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import ServicesContextProvider from './context/ServicesContext';
import { interceptRequests } from './interceptors/requestInterceptor';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

interceptRequests();
root.render(
  <React.StrictMode>
    <ServicesContextProvider>
      <App />
    </ServicesContextProvider>
  </React.StrictMode>
);
