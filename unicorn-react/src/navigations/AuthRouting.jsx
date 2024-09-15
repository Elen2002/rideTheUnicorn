import React from 'react';
import {Route, Routes} from "react-router-dom";
import FirstPage from "../screens/FirstPage";
import Register from "../screens/Register";
import SliderSettings from "../screens/SliderSettings";

function AuthRouting(props) {
    return (
        <Routes>
            <Route exact path="/"  element={<FirstPage />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AuthRouting;