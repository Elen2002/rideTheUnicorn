import React, {useEffect, useState} from 'react';
import { motion } from "framer-motion";
import {useTranslation} from "react-i18next";
import back from '../images/background.svg'
import {useDispatch} from "react-redux";
import {setSignIn} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";

function SliderSettings() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const texts = [
        "Главная цель игры – стать самой влиятельной и успешной компанией-единорогом в мире. А монеты XLVN - это твоя награда при листинге токенов.",
        "Используй любые честные и хитрые стратегии, мир единорогов одобряет",
        "Твои друзья, семья, знакомые - это твои инвесторы. Приглашай их и получай % со своих друзей и даже с их друзей",
        "Продвигайтесь по уровням, названным в честь знаменитых личностей. Достижение каждой лиги предоставляет уникальные бонусы и ресурсы",
    ];
    const smallTexts = [
        "Используй любые честные и хитрые стратегии, мир единорогов одобряет",
        "Играй в игры, проходи задания и получай дополнительный доход",
        "Концепция 3F (Friends, Family, and Fools). Приглашай и богатей",
        "Решай задачи и достигни успеха, удачи!",
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) =>
                prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [texts.length]);

        useEffect(() => {
            const timer = setTimeout(() => {
                setStartAnimation(true);
            }, 5000);

            return () => clearTimeout(timer);
        }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/')
        }, 23000)
        return () => clearTimeout(timer);
    }, []);
        return (
        <div className='App-header'>

            <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className = 'p-3 m-2 text-container'
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <p style={{fontStyle: 16}}> {t(texts[currentTextIndex])} </p>
                <small style={{fontStyle: 10}}> {t(texts[currentTextIndex])}</small>
            </motion.div>
            <div className='image-container'>
                <img src={back} className="repeating-animation"/>
            </div>
        </div>
    );
}

export default SliderSettings;