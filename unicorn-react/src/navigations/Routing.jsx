import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../screens/Home";
import Language from "../screens/Language";
import DayCheck from "../screens/DayCheck";
import Award from "../screens/Award";
import UnicornJump from "../screens/UnicornJump";
import SliderSettings from "../screens/SliderSettings";
import Exchange from "../screens/Exchange";
import Earn from "../screens/Earn";
import Friends from "../screens/Friends";
import UnicornBlum from "../screens/UnicornBlum";
import EarnSubscribePage from "../screens/EarnSubscribePage";
import GameOverScreen from "../screens/GameOverScreen";
import Liga from "../screens/Liga";

function Routing() {
    return (
            <Routes>
                <Route path="/slider" element={<SliderSettings />} />
                <Route path="/" element={<Home />} />
                <Route path="/languages" element={<Language />} />
                <Route path="/day/check" element={<DayCheck />} />
                <Route path="/award" element={<Award />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/unicorn/jump" element={<UnicornJump />} />
                <Route path="/earn/sub" element={<EarnSubscribePage />} />
                <Route path="/game/over" element={<GameOverScreen />} />
                <Route path="/liga" element={<Liga />} />
                <Route path="/unicorn/blum" element={<UnicornBlum />} />
            </Routes>
    );
}

export default Routing;