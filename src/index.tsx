import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider} from "@mantine/core";
import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom'
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import {CookiesProvider, useCookies} from 'react-cookie'
import Stream from "./pages/stream/stream";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/admin',
        element: <Admin/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/stream/:stream_id",
        element: <Stream/>
    }
])


root.render(

  <React.StrictMode>

       <MantineProvider withGlobalStyles withNormalizeCSS theme={{
           colorScheme: 'dark'
       }}>
              <CookiesProvider>
                  <RouterProvider router={router}/>
              </CookiesProvider>
       </MantineProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
