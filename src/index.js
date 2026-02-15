import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
              <BrowserRouter>
                  <App />
                 <Toaster
                  position="bottom-center"
                  reverseOrder={false}
                  toastOptions={{
                    duration: 4000,
                    className: "toast-success", // common base styles
                    success: {
                      className: "toast-success", // use CSS class for success
                    },
                    error: {
                      className: "toast-success", // use CSS class for error
                    },
                    icon:null
                  }}
                />
              </BrowserRouter>
            </React.StrictMode>
);

