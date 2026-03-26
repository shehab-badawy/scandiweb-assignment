import React from 'react';
import ReactDOM from 'react-dom/client';

// Change this line specifically:
import { ApolloProvider } from '@apollo/client/react'; 

import client from './graphql/client';
import { CartProvider } from './context/CartContext';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartProvider>
        <App />
      </CartProvider>
    </ApolloProvider>
  </React.StrictMode>
);