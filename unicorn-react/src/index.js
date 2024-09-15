import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import global_en from './translations/en/global.json';
import global_ru from './translations/ru/global.json';
import global_de from './translations/de/global.json';
import global_es from './translations/es/global.json';
import global_fr from './translations/fr/global.json';
import global_hi from './translations/hi/global.json';
import global_id from './translations/id/global.json';
import global_pt from './translations/pt/global.json';
import global_th from './translations/th/global.json';
import global_thv from './translations/thv/global.json';
import global_tl from './translations/tl/global.json';
import global_tr from './translations/tr/global.json';
import global_zh from './translations/zh/global.json';
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
console.log(localStorage.getItem('i18nextLng'))
i18next.init({
    interpolation: {escapeValue: false},
    lng: localStorage.getItem('i18nextLng') =='undefined' ||localStorage.getItem('i18nextLng') =='' || localStorage.getItem('i18nextLng') == null ? 'En': localStorage.getItem('i18nextLng') ,
    resources:{
        En:{
            global : global_en,
        },

        Ru:{
            global : global_ru,
        },
        De:{
            global : global_de,
        },
        Es:{
            global : global_es,
        },
        Fr:{
            global : global_fr,
        },
        Hi:{
            global : global_hi,
        },
        Id:{
            global : global_id,
        },
        Pt:{
            global : global_pt,
        },
        Th:{
            global : global_th,
        },
        Thv:{
            global : global_thv,
        },
        Tl:{
            global : global_tl,
        },
        Tr:{
            global : global_tr,
        },
        Zh:{
            global : global_zh,
        }
    }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18next}>
          <App/>
      </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
