import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './pages'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
    <script>
      {
        //Verifica se o User está logado para ter acesso a uma página privada
        //Verifica se o usuário tem um token para entrar diretamente na página do dashboard
        window.addEventListener("load", () =>
        {
          const pagesPrivy = [ "/dashboard" ]
          const auth = localStorage.getItem("auth");
          const authToken = JSON.parse(auth)?.accessToken;
          const pathName = window.location.pathname;

          const firstLoad = sessionStorage.getItem("firstLoad");
          if ( !firstLoad ) sessionStorage.setItem("firstLoad", true);
          
          if ( !authToken && ( pagesPrivy.includes(pathName) ) ) window.location.pathname = "/";
          if ( !firstLoad && !(!authToken) ) window.location.pathname = "/dashboard";
        })
      }
    </script>
  </React.StrictMode>
)
