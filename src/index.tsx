import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StorageProvider } from './domain/contexts/storage.context';
import { ProductsProvider } from './domain/contexts/products.context';
import { ClientsProvider } from './domain/contexts/clients.context';
import { SalesProvider } from './domain/contexts/sales.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ClientsProvider>
      <ProductsProvider>
        <StorageProvider>
          <SalesProvider>
            <App />
          </SalesProvider>
        </StorageProvider>
      </ProductsProvider>
    </ClientsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
