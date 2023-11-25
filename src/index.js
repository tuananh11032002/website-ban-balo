import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StateProvider from './StateProvider/StateProvider';
import { initialValues } from './StateProvider/reducer';
import reducer from './StateProvider/reducer';
import { BrowserRouter } from 'react-router-dom';
import AppTem from './AppTem';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <StateProvider initial={initialValues} reducer={reducer}>
         <BrowserRouter>
            <App />
            {/* <AppTem /> */}
         </BrowserRouter>
      </StateProvider>
   </React.StrictMode>
);
