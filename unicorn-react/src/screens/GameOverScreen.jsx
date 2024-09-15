import React, {useState} from 'react';
import src from "../images/icons/lightning.svg";
import coinSrc from "../images/icons/coin.svg";
import ticketSrc from "../images/icons/ticket.svg";
import {Button} from "react-bootstrap";
import {FaChevronRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import Modal from "../components/Modal";
import Alert from "../components/Alert";

function GameOverScreen() {
    const [coin, setCoin] = useState(30)
    const {t} = useTranslation('global');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const [fr, setFr] = useState(localStorage.getItem('friends')||0);
    const [status, setStatus] = useState('')
    const url = window.location.href;
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [notice, setNotice] = useState('')

    const handleShare = async () => {
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=Join%20me%20on%20Ride%20the%20Unicorn%20and%20let's%20earn%20together!%20Use%20my%20invite%20link%20to%20join%20the%20fun.%20🌟`;
        closeModal()
        let f = fr + 1
        let frcount = 2-f
        console.log(fr)
        setFr(frcount)
        localStorage.setItem('friends', frcount)
        window.open(telegramShareUrl, '_blank');
        setStatus('loading');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('defualt');
    };
    const handleCopy = async () => {
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            setIsNoticeOpen(true)
            document.execCommand('copy');
            setNotice( t('Link copied'))
            const id = setTimeout(() => {
                setIsNoticeOpen(false);
            }, 5000);
        } catch (error) {
            console.error('Ошибка при копировании ссылки: ', error);
            setIsNoticeOpen(true)
            setNotice( t('Не удалось скопировать ссылку. Попробуйте вручную.'))
            const id = setTimeout(() => {
                setIsNoticeOpen(false);
            }, 5000);
        }
        document.body.removeChild(tempInput);

        closeModal()
    };
    return (
        <div className='p-3'>
            <Alert isOpen={isNoticeOpen}>
                <small className='fs-6 fw-bold'>{notice}</small>
            </Alert>
            <div className='top-0 text-white'>
                <p>Ride the Unicorn
                    <br/>
                    <small>бот</small>
                </p>
            </div>
            <div className="App-header">
                <img src={src}/>
                <h1 className='text-white mt-4 mb-5'>Dropping Down, Rising Up! You’re a Star!</h1>
                <div className='d-flex justify-content-between p-4'>
                        <img className='mt-4' width={34} src={coinSrc}/>
                        <p className='fs-2 pt-4 p-0 m-0'> {coin}</p>
                </div>
                <small className='text-white m-3'>Награда</small>
                <div className='pt-5'>
                    <Button onClick={openModal} className='Text-unicorn w-100 mt-1' variant="light">Пригласи друга, получи <img src={ticketSrc}/></Button>
                    <Button  className='Text-unicorn w-100 mt-1' variant="light">Играть (<img src={ticketSrc}/> 83)</Button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} t={t}>
                <Button onClick={handleShare} className='Text-unicorn m-1 w-100'
                        variant="light">{t('Send')}</Button>
                <Button onClick={handleCopy} className='Text-unicorn m-1 w-100'
                        variant="light">{t('Copy link')}</Button>
                <button onClick={closeModal}
                        className='closeButton text-white fs-6 pt-1'>{t('Close')}</button>
            </Modal>
        </div>
    );
}

export default GameOverScreen;