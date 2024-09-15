import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useTranslation} from "react-i18next";
import earnIcon from '../images/icons/earnicon.png'
import inviteFr from '../images/earn and friends/inviteFiend.png'
import telegram from '../images/earn and friends/telegram.png'
import instagram from '../images/earn and friends/instagram.png'
import youtube from '../images/earn and friends/youtube.png'
import quest from '../images/earn and friends/quest.png'
import farmPoint from '../images/earn and friends/farmPoints.svg'
import coin from '../images/icons/coin.svg'
import fre from '../images/earn and friends/fr.png'
import jumpIcon from '../images/earn and friends/jumpIcon.png'
import coinUnicorn from '../images/icons/coin-unicorn.svg'
import {Button, ListGroup} from "react-bootstrap";
import Modal from '../components/Modal'
import Alert from "../components/Alert";
import {FiCheckCircle} from "react-icons/fi";
import icon_unicorn from "../images/icons/icon-unicorn.svg";
import EarnButton from "../components/EarnButton";
import {useLocation, useNavigate} from "react-router-dom";

function Earn() {
    const {t} = useTranslation('global');
    const navigate = useNavigate()
    const url = window.location.href;
    const location = useLocation();
    let [params, setParams] = useState(location.state || false)
    const coins = localStorage.getItem('coins')
    const [fr, setFr] = useState(localStorage.getItem('JoinFr'))
    const [joinFriends, setJoinFriends] = useState(localStorage.getItem('joinFriends') || false)
    const [notice, setNotice] = useState('')
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const [X11Teleg, setX11Teleg] = useState(localStorage.getItem('X11Teleg') || false)
    const [X11Inst, setX11Inst] = useState(localStorage.getItem('X11Inst') || false)
    const [X11You, setX11You] = useState(localStorage.getItem('X11You') || false)
    const [X11CeoTeleg, setX11CeoTeleg] = useState(localStorage.getItem('X11CeoTeleg') || false)
    const [RideUnTeleg, setRideUnTeleg] = useState(localStorage.getItem('RideUnTeleg') || false)
    const [RideUnInst, setRideUnInst] = useState(localStorage.getItem('RideUnInst') || false)
    const [RideYou, setRideYou] = useState(localStorage.getItem('RideYou') || false)
    const [JoinX11, setJoinX11] = useState(localStorage.getItem('JoinX11') || false)
    const [questCount, setQuestCount] = useState(localStorage.getItem('quest') || 0)
    const [UnicornQuest, setUnicornQuest] = useState(localStorage.getItem('UnicornQuest') || false)
    const [selectBirj, setSelectBirj] = useState(localStorage.getItem('selectBirj') || false)
    const [PlayXLVN5, setPlayXLVN5] = useState(localStorage.getItem('PlayXLVN5') || false)
    const [PlayPVP3, setPlayPVP3] = useState(localStorage.getItem('PlayPVP3') || false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleShare = async () => {
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=Join%20me%20on%20Ride%20the%20Unicorn%20and%20let's%20earn%20together!%20Use%20my%20invite%20link%20to%20join%20the%20fun.%20🌟`;
        window.open(telegramShareUrl);
        let newfr = +fr + 1
        localStorage.setItem('JoinFr', newfr)
        setFr(newfr)
    };
        const subscribeX11 = (params) => {
            let body
            switch (params) {
                case 'X11telegram': {
                    body = {
                        page: params,
                        task: "<p>" + t('subscribe X11 telegram') + "</p>",
                        header: "<p>1." + t('you need subscribe our telegram') + "</p><p>2." + t('you need input your nik telegram for verify') + "</p>",
                        coins: '2,000',
                        url: '' //  X11 telegram url
                    }
                    break;
                }
                case 'X11instagram': {
                    body = {
                        task: "<p>" + t('subscribe X11 Instagram') + "</p>",
                        header: "<p>1." + t('you need subscribe our instagram') + "</p><p>2." + t('you need input your nik instagram for verify') + "</p>",
                        coins: '2,000',
                        url: '' //  X11 instagram url
                    }
                    break;
                }
                case 'X11youtube': {
                    body = {
                        task: "<p>" + t('Watch the video to the end and tell us how many times the trophy lit up.') + "</p>",
                        header: "<h3>1." + t('Watch new video') + "</h3><p>2." + t('text') + "</p>",
                        coins: '2,000',
                        url: '' //  X11 youtube url
                    }
                    break;
                }
                case 'X11CeoTelegram':{
                    body = {
                        task: "<p>" + t('subscribe X11 CEO on Telegram') + "</p>",
                        header: "<p>1." + t('you need subscribe X11 CEO teleram') + "</p><p>2." + t('you need input your nik telegram for verify') + "</p>",
                        coins: '2,000',
                        url: '' //  X11 CEO telegram url
                    }
                    break;
                }
                case 'UnicornTelegram':{
                    body = {
                        task: "<p>" + t('subscribe Ride The Unicorn Telegram') + "</p>",
                        header: "<p>1." + t('you need subscribe Ride The Unicorn teleram') + "</p><p>2." + t('you need input your nik telegram for verify') + "</p>",
                        coins: '2,000',
                        url: '' //  Ride The Unicorn telegram url
                    }
                    break;
                }
                case 'UnicornInstagram':{
                    body = {
                        task: "<p>" + t('subscribe Ride The Unicorn Instagram') + "</p>",
                        header: "<p>1." + t('you need subscribe Ride The Unicorn Instagram') + "</p><p>2." + t('you need input your nik instagram for verify') + "</p>",
                        coins: '2,000',
                        url: '' //  Ride The Unicorn instagram url
                    }
                    break;
                }
                case 'UnicornYoutube':{
                    body = {
                        task: "<p>" + t('Watch the video to the end and tell us how many times the trophy lit up.') + "</p>",
                        header: "<p>1." + t('you need subscribe Ride The Unicorn Youtube') + "</p><p>2." + t('text') + "</p>",
                        coins: '2,000',
                        url: '' //  Ride The Unicorn Youtube url
                    }
                    break;
                }
                case 'X11':{
                    body = {
                        task: "<p>" + t('3.Send your ID for verification') + "</p>",
                        header: "<p>1." + t('1.Register on X11') + "</p>"+
                            "<p>2." + t('2.Pass verification') + "</p>" +
                            "<p>3." + t('3.Send your ID for verification') + "</p>"+
                            "<p>" + t('After completing the mission, all data will be checked for accuracy. If it is incorrect, the reward for participating in the task will be removed.') + "</p>",
                        coins: '2,000',
                        card: "  <div class='w-100 d-flex p-2 mb-2 justify-content-between text-start li-unicorn'>" +
                            "                    <p class='p-0 m-0 fs-6'>"+t('1.Register on X11')+"</p>" +
                            "    <button  class='mt-2  rounded-4 bg-white border-white'>" +
                            "   <a class='text-decoration-none  Text-unicorn' href='https://x11.im/'>"+
                                                     t('Start')+
                            "</a>"+
                            "                </div>" +
                            "            </div>"+
                            "  <div class='w-100 d-flex p-2 mb-2 justify-content-between text-start li-unicorn'>" +
                            "                    <p class='p-0 m-0 fs-6'>"+t('2.Pass verification')+"</p>" +
                            "    <button  class='mt-2  rounded-4 bg-white border-white'>" +
                            "   <a class='text-decoration-none  Text-unicorn' href='https://x11.im/register'>"+
                            t('Start')+
                            "</a>"+
                            "                </div>" +
                            "            </div>",
                        url: '' //  X11 url
                    }
                    break
                }
            }
            navigate('/earn/sub', {state: body})
        }

    useEffect(() => {
        if (fr == 2 && !joinFriends) {
            localStorage.setItem('joinFriends', true)
            setJoinFriends(true)
            setNotice(t('You got') + ' 2000 XLVN')
            setIsNoticeOpen(true)
            let newCoins = +coins + 2000
            localStorage.setItem('coins', newCoins)
            const id = setTimeout(() => {
                setIsNoticeOpen(false);
            }, 5000);
        }
        switch (params.page) {
            case 'X11telegram': {
                localStorage.setItem('X11Teleg', true)
                setX11Teleg(true)
                setNotice(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
                break
            }
            case 'X11instagram': {
                localStorage.setItem('X11Inst', true)
                setX11Inst(true)
                setNotice(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
                break
            }
            case 'X11youtube': {
                localStorage.setItem('X11you', true)
                setX11You(true)
                setNotice(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
            break
            }
            case 'X11CeoTelegram':{
                localStorage.setItem('X11CeoTeleg', true)
                setX11CeoTeleg(true)
                setNotice(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
                break
            }
            case 'UnicornTelegram':{
                localStorage.setItem('RideUnTeleg', true)
                setRideUnTeleg(true)
                setNotice(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
                break
            }
            case 'UnicornInstagram':{
                localStorage.setItem('RideUnInst', true)
                setX11You(true)
                setRideUnInst(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
                break
            }
            case 'UnicornYoutube':{
                localStorage.setItem('RideYou', true)
                setRideYou(true)
                setNotice(t('You got') + ' 2000 XLVN')
                setIsNoticeOpen(true)
                let newCoins = +coins + 2000
                localStorage.setItem('coins', newCoins)
                const id = setTimeout(() => {
                    setIsNoticeOpen(false);
                }, 5000);
                break
            }
            default: setParams('')
        }
    }, [fr, params]);
    return (
        <div>
            <Alert isOpen={isNoticeOpen}>
                <small className='fs-7 fw-bold'>{notice}</small>
            </Alert>
            <div>
                <img width={50} className='pt-5' src={earnIcon} alt="Earn Icon"/>
                <p className='text-white fs-4'>{t('Tasks')}: 13</p>
                <p className='w-75 ms-5 text-white fs-7 p-3 pt-0'>{t('We will reward you immediately after completing each task.')}</p>
            </div>
            <div className='mb-5 pb-3'>
                <ListGroup>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={29} src={inviteFr} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Invite 2 friends')} {fr ? fr : 0}/2</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {joinFriends ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={handleShare}>
                                {fr == 1 ? t('Claim') : t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={farmPoint} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Farm points')} 0/1,000.00</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        <EarnButton>
                            {t('Start')}
                        </EarnButton>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={telegram} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Subscribe to X11 Telegram')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {X11Teleg ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('X11telegram')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={instagram} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Join X11 Instagram')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {X11Inst ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('X11instagram')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={youtube} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Follow X11 on YouTube')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {X11You ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('X11youtube')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={telegram} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Follow X11 CEO on Telegram')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {X11CeoTeleg ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('X11CeoTelegram')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={telegram} alt="Invite Friend"/>
                        <div>
                            <label
                                className='pt-1 fs-6 ps-1 text-white'>{t('Subscribe Ride the Unicorn Telegram')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {RideUnTeleg ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('UnicornTelegram')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={instagram} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Join Ride the Unicorn Inst')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {RideUnInst ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('UnicornInstagram')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={youtube} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Follow Ride the Unicorn YouTube')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {RideYou ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('UnicornYouTube')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={''} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Join X11')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {JoinX11 ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{subscribeX11('X11')}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={quest} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Unicorn Quest')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {UnicornQuest ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={openModal}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={icon_unicorn} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Choose exchange')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {selectBirj ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{if (localStorage.getItem('exchange')){
                            setSelectBirj(true)
                            localStorage.setItem('SelectBirj', true)}
                            }}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={coinUnicorn} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Play the XLVN game 5 times')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {PlayXLVN5 ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{
                                setPlayXLVN5(true)
                                    localStorage.setItem('PlayXLVN5',true)
                                setNotice(t('You got') + ' 2000 XLVN')
                                setIsNoticeOpen(true)
                                let newCoins = +coins + 2000
                                localStorage.setItem('coins', newCoins)
                                const id = setTimeout(() => {
                                    setIsNoticeOpen(false);
                                }, 5000);}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                        <img width={28} src={jumpIcon} alt="Invite Friend"/>
                        <div>
                            <label className='pt-1 fs-6 ps-1 text-white'>{t('Play the PVP game 3 times')}</label>
                            <p className='p-0 fs-7 text-white'><img width={17} src={coin} alt="Coin"/>2,000</p>
                        </div>
                        {PlayPVP3 ?
                            <FiCheckCircle className='fs-4' style={{color: '#B283FF80'}}/> :
                            <EarnButton fn={()=>{setPlayPVP3(true)
                                localStorage.setItem('PlayPVP3',true)
                                setNotice(t('You got') + ' 2000 XLVN')
                                setIsNoticeOpen(true)
                                let newCoins = +coins + 2000
                                localStorage.setItem('coins', newCoins)
                                const id = setTimeout(() => {
                                    setIsNoticeOpen(false);
                                }, 5000);}}>
                                {t('Start')}
                            </EarnButton>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </div>
            {isModalOpen?
                <div className='d-flex fixed-bottom p-1 justify-content-center align-items-center' style={{maxWidth: "760px", background:'#592BA2'}}>
                    <Button className='disabled Text-unicorn bg-white w-100' variant="light">
                        {t('Clime 777 XLVN')}
                    </Button>
                </div>:
            <Navbar bg={'#431D82'}/>
            }
            <Modal isOpen={isModalOpen} onClose={closeModal} t={t} h={1200} header={t('Unicorn Quest')+' '+questCount+'/5'}>
            <textarea className='form-control'/>
                <small className='text-white'>{t('Join our X11 friends! Complete quuests for a chance to participate in our giveway one week after!')}</small>
                <ListGroup className='mb-5'>
                <ListGroup.Item
                    className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                    <img width={26} src={fre} alt="Invite Friend"/>
                    <div>
                        <label className='pt-1 fs-6 ps-1 text-white'>{t('Join Ton Station')}</label>
                    </div>
                        <EarnButton>
                            {t('Start')}
                        </EarnButton>
                </ListGroup.Item>
                <ListGroup.Item
                    className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                    <img width={26} src={fre} alt="Invite Friend"/>
                    <div>
                        <label className='pt-1 fs-6 ps-1 text-white'>{t('Join Ton Station')}</label>
                    </div>
                        <EarnButton>
                            {t('Start')}
                        </EarnButton>
                </ListGroup.Item>
                <ListGroup.Item
                    className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                    <img width={26} src={fre} alt="Invite Friend"/>
                    <div>
                        <label className='pt-1 fs-6 ps-1 text-white'>{t('Join Ton Station')}</label>
                    </div>
                        <EarnButton>
                            {t('Start')}
                        </EarnButton>
                </ListGroup.Item>
                <ListGroup.Item
                    className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                    <img width={26} src={fre} alt="Invite Friend"/>
                    <div>
                        <label className='pt-1 fs-6 ps-1 text-white'>{t('Join Ton Station')}</label>
                    </div>
                        <EarnButton>
                            {t('Start')}
                        </EarnButton>
                </ListGroup.Item>
                <ListGroup.Item
                    className='mb-1 pb-0 pt-0 m-2 li-unicorn text-start d-flex align-items-center justify-content-between'>
                    <img width={26} src={fre} alt="Invite Friend"/>
                    <div>
                        <label className='pt-1 fs-6 ps-1 text-white'>{t('Join Ton Station')}</label>
                    </div>
                        <EarnButton>
                            {t('Start')}
                        </EarnButton>
                </ListGroup.Item>

            </ListGroup>

            </Modal>
        </div>
    );
}

export default Earn;
