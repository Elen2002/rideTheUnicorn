import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import srcCoin from '../images/icons/coin.svg'
import srcUnicorn from '../images/unicorn-click.svg'
import gameBack from '../images/image-game.svg'
import backGame from '../images/back-game.svg'
import coinUnicorn from '../images/icons/coin-unicorn.svg'
import iconUnicorns from '../images/icons/icon-unicorns.svg'
import ticket from '../images/icons/mini-ticket.svg'
import ProgressBar from 'react-bootstrap/ProgressBar';
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {Button} from "react-bootstrap";
import TimerProgress from "../components/TimerProgress";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {API_URL} from "../utils/global";
import stringify from "qs-stringify";

function Home() {
    const totalClicks = 111;
    const totalHours = 8;
    const secondsPerClick = Math.round((totalHours * 3600) / totalClicks, 1);
    const [isNewDay, setIsNewDay] = useState(false);
    const [daysVisited, setDaysVisited] = useState(0);
    const [progress, setProgress] = useState(localStorage.getItem('progress') || 50);
    const navigate = useNavigate();
    const { t } = useTranslation("global");
    const [coins, setCoins] = useState(localStorage.getItem('coins') || 0)
    const [tickets, setTickets] = useState(localStorage.getItem('tickets') || 0)
    let level = localStorage.getItem('level')
    const [notifications, setNotifications] = useState([]);
    const [clicksRemaining, setClicksRemaining] = useState(localStorage.getItem('clicksRemaining') || totalClicks);
    const [remainingTime, setRemainingTime] = useState(localStorage.getItem('remainingTime') || 0);
    const [timerSeconds, setTimerSeconds] = useState(+localStorage.getItem('timerSeconds')||0);
    const [timerStarted, setTimerStarted] = useState(localStorage.getItem('timerStarted')|| false);
    localStorage.setItem('tickets', 20)
    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const now = new Date().getTime();

        const newNotification = {
            id: Date.now(),
            x,
            y
        };
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        let newCount = +coins + 1;
        setCoins(newCount);

        if (clicksRemaining <= 0) return;

        const newClicks = clicksRemaining - 1;
        setClicksRemaining(newClicks);
        localStorage.setItem('clicksRemaining', newClicks);

        let remTime = +remainingTime + secondsPerClick;
        localStorage.setItem('remainingTime', +remTime);
        setRemainingTime(+remTime);
        setTimerSeconds(remTime)

        const endDate = now + remTime * 1000; // Convert seconds to milliseconds
        localStorage.setItem('endDate', endDate);

        if (!timerStarted) {
            setTimerStarted(true);
            startTimer();
        }

        localStorage.setItem('timerStarted', timerStarted);
        localStorage.setItem('coins', newCount);

        setTimeout(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((n) => n.id !== newNotification.id)
            );
        }, 1000);
    };
    const startTimer = () => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const endDate = localStorage.getItem('endDate');
            if (now >= endDate) {
                clearInterval(interval);
                setTimerSeconds(0);
                setClicksRemaining(111)
                setTimerStarted(false);
                localStorage.removeItem('endDate');
                localStorage.removeItem('timerSeconds');
                localStorage.setItem('clicksRemaining', clicksRemaining)
            } else {
                const remaining = Math.max(0, Math.floor((endDate - now) / 1000));
                setRemainingTime(remaining);
                localStorage.setItem('remainingTime', remaining);
                console.log(localStorage.getItem('clicksRemaining'))

                if(timerSeconds-remaining > secondsPerClick){
                    console.log(41)
                    let click = Math.round((timerSeconds-remaining)/2, 1)
                    setTimerSeconds(remaining)
                    let newClick = +clicksRemaining + click
                    setClicksRemaining(newClick)
                    localStorage.setItem('clicksRemaining', newClick)
                    localStorage.setItem('timerSeconds', remaining)
                }
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    };
    useEffect(() => {
        const endDate = localStorage.getItem('endDate');
        if (endDate) {
            startTimer();
        }
    }, []);

    localStorage.setItem('timerSeconds', +timerSeconds)

    const setCoinAPI = async () => {
        const response = await fetch(API_URL + '/user/set/userData', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({coins: coins, level: level, id: localStorage.getItem('id')})
        })
        const json = await response.json();
        console.log(json)
        if (json.status) {
            console.log(json.message)
        }else{
            console.log(json.message)
        }
    }

    useEffect( () => {
        setCoinAPI()
    },[coins, level])
    useEffect(() => {
        const currentDate = new Date().toLocaleDateString();
        const lastVisit = localStorage.getItem('lastVisitDate');
        let visitedDays = localStorage.getItem('visitedDays')
        if (lastVisit !== currentDate) {
            setIsNewDay(true);
            localStorage.setItem('lastVisitDate', currentDate);
            navigate('/day/check')
            if (visitedDays) {
                visitedDays = parseInt(visitedDays) + 1;
            } else {
                visitedDays = 1;
            }
            setDaysVisited(visitedDays);
            localStorage.setItem('visitedDays', visitedDays);
        } else {
            setIsNewDay(false);
            setDaysVisited(visitedDays);
        }
    } ,[])

    return (
        <div className='App-home'>
            <Header />
            <div className='bg-transparent home-back '>
                <div className='d-flex justify-content-center'>
                    <img src={srcCoin}/>
                    <p className='fs-2 p-2 pt-4 text-white'>{coins}</p>
                </div>
                <div>
                    <div className='d-flex justify-content-between'>
                    <p className='p-2 pb-0 text-white'>{t('Unicorn')} <MdOutlineKeyboardArrowRight className=' fs-2 text-white' /></p>
                    <p className='p-2 pb-0 text-white d-flex'><p className='text-secondary'>{t('Level')}</p>  {level}/11</p>
                    </div>
                 <ProgressBar variant="secondary" animated className='ms-2 me-2' now={progress} />
                </div>
                <div className='pt-3 pb-4'>
                    { clicksRemaining == 0?
                        <motion.button
                            // whileTap={{ scale: 0.9 }}
                            style={{ padding: "10px 20px", fontSize: "16px", position: "relative" }}
                            className='btn-big-unicorn m-3 p-0'
                        >
                            <div className='btn-unicorn-inside p-4'>
                                <img src={srcUnicorn}/>
                            </div>
                        </motion.button>
                   :
                    <div className='pt-3 pb-4 mb-4'>
                    <motion.button
                        onClick={handleClick}
                        whileTap={{ scale: 0.9 }}
                        style={{ padding: "10px 20px", fontSize: "16px", position: "relative" }}
                        className='btn-big-unicorn m-3 p-0'
                    >
                        <div className='btn-unicorn-inside p-4'>
                            <img src={srcUnicorn}/>
                        </div>
                    {notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: -30 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: "absolute",
                                top: notification.y - 20 + "px",
                                left: notification.x + "px",
                                color: "white",
                                fontSize: "20px",
                                pointerEvents: "none",
                            }}
                        >
                            +1
                        </motion.div>
                    ))}
                    </motion.button>
                    </div>
                    }
                    <TimerProgress params={
                        {clicksRemaining: clicksRemaining,
                            remainingTime: remainingTime, timerSeconds: timerSeconds, timerStarted: timerStarted}} />
                    <div className='d-flex pt-3 justify-content-center'>
                        <div className='ms-3 rounded-4 w-50' style={{background: '#7249B3'}}>
                        <div className='image-back p-2' style={{backgroundImage: `url(`+gameBack+`)`}}>
                        <img src={coinUnicorn}/>
                            <div className='d-flex justify-content-between text-start'>
                            <div className='p-0 m-1'>
                                <small className='fs-8 p-0 m-0'>{t('XLVN game')}</small> <br/>
                                <img src={ticket} />
                                <small className='fs-7 m-1'>{tickets}</small>
                            </div>
                                <div>
                                    { tickets == 0?
                                        <Button className='mt-2 disabled rounded-4 bg-white  border-white' style={{height: '40px'}}>
                                            <p className='disabled Text-unicorn fs-7' >{t('Play')}</p>
                                        </Button>:
                                        <Button className='mt-2 rounded-4 bg-white  border-white'onClick={() => {
                                            navigate('/unicorn/blum')
                                        }} style={{height: '40px'}}>
                                            <p className='Text-unicorn fs-7' >{t('Play')}</p>
                                        </Button>
                                    }

                                </div>

                            </div>
                        </div>
                        </div>
                        <div className='ms-3 me-3 p-2 rounded-4 w-50' style={{backgroundImage: `url(` + backGame + `)`}}>
                            <img src={iconUnicorns}/>
                            <div className='d-flex justify-content-between text-start'>
                                <div className='p-0 m-1'>
                                    <small className='fs-8 p-0 m-0'>{t('PVP game')}</small> <br/>
                                    <img src={ticket}/>
                                    <small className='fs-7 m-1'>{tickets}</small>
                                </div>
                                <div>
                                    { tickets == 0?
                                        <Button className='disabled mt-2 rounded-4 bg-white  border-white' style={{height: '40px'}}>
                                        <p className='disabled Text-unicorn fs-7'>{t('Play')}</p>
                                        </Button>:
                                    <Button className='mt-2 rounded-4 bg-white  border-white' onClick={() => {
                                        navigate('/unicorn/jump')
                                    }}  style={{height: '40px'}}>
                                        <p className='Text-unicorn fs-7'>{t('Play')}</p>
                                    </Button>
                            }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Navbar/>
            </div>
        </div>
    );
}

export default Home;