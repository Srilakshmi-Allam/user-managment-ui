import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{Auth0Provider} from '@auth0/auth0-react';
import {AUTH0_DOMAIN,AUTH0_CLIENT_ID} from "./config";
import { Provider } from 'react-redux';
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider 
  domain={AUTH0_DOMAIN}
  clientId={AUTH0_CLIENT_ID}
  authorizationParams={{
    redirect_uri: window.location.origin}} >  
    <Provider store={store} >
       <App />
    </Provider>
  </Auth0Provider>
);


