import './css/App.css';
import React from "react";
import AppRoute from "./navigations/AppRoute";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {useTranslation} from "react-i18next";
import spice from "./images/space.svg";


function App() {
  return (
      <div className="App">
          <div style={{backgroundImage: `url(`+spice+`)`}}>
              <Provider store={store}>
                  <AppRoute />
              </Provider>
          </div>
      </div>
  );

}

export default App;
