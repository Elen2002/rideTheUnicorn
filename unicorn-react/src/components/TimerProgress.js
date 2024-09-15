import React, { useState, useRef, useEffect } from 'react';
import timerIcon from '../images/icons/timer-icon.svg';
import timerWhiteIcon from '../images/icons/timer-white.svg';
import {useTranslation} from "react-i18next";
const TimerProgress = ({params}) => {
    const {t}= useTranslation("global")
    const [clickName, setClickName] = useState(' FARMING');
    const totalClicks = 111;
    const totalHours = 8;
    const secondsPerClick = Math.round((totalHours * 3600) / totalClicks, 1);
    const timerRef = useRef(null);
    const [clicksRemaining, setClicksRemaining] = useState(params.clicksRemaining);
    const [remainingTime, setRemainingTime] = useState(params.remainingTime);
    const [timerSeconds, setTimerSeconds] = useState(params.timerSeconds);
    const [timerStarted, setTimerStarted] = useState(params.timerStarted);
    const now = new Date().getTime();

    useEffect(() => {
        setClicksRemaining(params.clicksRemaining)
        setRemainingTime(params.remainingTime)
        setTimerSeconds(params.timerSeconds)
        setTimerStarted(params.timerStarted)
    }, [params]);
    useEffect(() => {
        localStorage.setItem('clicksRemaining', clicksRemaining)
        localStorage.setItem('remainingTime', remainingTime)
        localStorage.setItem('timerSeconds', timerSeconds)
        localStorage.setItem('timerStarted', timerStarted)
    }, [clicksRemaining,remainingTime, timerSeconds, timerStarted ]);
    useEffect(() => {
        if (timerStarted) {
            timerRef.current = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        setClicksRemaining((prevClicks) => Math.min(prevClicks + 1, totalClicks));
                        setClickName( clicksRemaining === 111? 'CLIME':'FARMING')
                        return 0;
                    } else {
                        if (timerSeconds - prevTime == secondsPerClick){
                            let newClick = +clicksRemaining+1
                            setClicksRemaining(newClick)
                            setTimerSeconds(prevTime)
                        }
                        return prevTime - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [timerStarted, remainingTime]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateProgress = () => {
        if (clicksRemaining === totalClicks) {
            return 100;
        }else if (clicksRemaining <= 0){
            return 0;
        }
        return ((clicksRemaining / totalClicks) * 100).toFixed(0);
    };
    return (
        <div className='m-2' style={{ backgroundColor: '#fff', borderRadius: '5px', position: 'relative' }}>
            <div
                style={calculateProgress() === 100 ?{
                    width: `${calculateProgress()}%`,
                    height: '40px',
                    backgroundColor: 'rgba(26, 186, 0, 1)',
                    borderRadius: '5px',
                    transition: 'width 1s linear',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }:{
                    width: `${calculateProgress()}%`,
                    height: '40px',
                    backgroundColor: 'rgba(238, 238, 238, 1)',
                    borderRadius: '5px',
                    transition: 'width 1s linear',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <div
            style={{
                    position: 'relative',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'rgba(89, 43, 162, 1)',
                    fontWeight: 'bold',
                }}
            >
                <div className='align-content-start p-2' style={calculateProgress() === 100 ? {color: 'white'}: {color:'#592BA2'}}>
                    {
                        calculateProgress() === 100 ? <img src={timerWhiteIcon}/> : <img src={timerIcon}/>}
                    <p className='p-0 m-0' style={{fontSize: '8px'}}>
                        {formatTime(remainingTime)}
                    </p>
                </div>
                <div style={calculateProgress() === 100 ? {color: 'white', width: '90%'}: {color:'#592BA2', width: '90%'}}>
                    {clicksRemaining}
                    {clickName}
                </div>
            </div>
        </div>
    );
    ;
};

export default TimerProgress;