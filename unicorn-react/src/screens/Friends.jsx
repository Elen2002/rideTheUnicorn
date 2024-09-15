import React, {useState} from 'react';
import Navbar from "./Navbar";
import family from '../images/earn and friends/family.svg'
import {useTranslation} from "react-i18next";
import dotLine from '../images/earn and friends/icon.svg'
import ticket from '../images/earn and friends/ticket.svg'
import {Button} from "react-bootstrap";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import watch from '../images/icons/watch.png'
import user from '../images/icons/user.jpg'
import coin from '../images/icons/coin.svg'
import {FaChevronRight} from "react-icons/fa";
import {HiOutlineUsers} from "react-icons/hi";

function Friends() {
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
        let frcount = 2-fr
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
        <div style={{height: '100vh'}}>
            <Alert isOpen={isNoticeOpen}>
                <small className='fs-6 fw-bold'>{notice}</small>
            </Alert>
            <div className='p-1 pt-4'>
                <div className='mt-3'>
                    <img src={family}/><br/>
                    <small className='fs-1 pb-0 text-white'>{t('Invite friends')}</small><br/>
                    <small className='fs-1 text-white'>{t('Earn bonuses')}</small>
                </div>
                {fr > 0 ?
                    <div className='p-2'>
                        { status === 'loading' ?
                        <div className='p-2 bg-transparent' style={{
                            border: 2,
                            borderStyle: 'solid',
                            borderColor: '#7249B3',
                            borderRadius: 12,
                        }}>
                            <img width={38} src={watch}/>
                            <p style={{color: 'lightgrey'}} className='m-2 fs-3'>{t('Calculating...')}</p>
                        </div>:
                            <div className='p-2 bg-transparent' style={{
                                border: 2,
                                borderStyle: 'solid',
                                borderColor: '#7249B3',
                                borderRadius: 12,
                            }}>
                                <div className='d-flex justify-content-center'>
                                <img width={38} src={coin}/>
                                <p className='m-2 text-white fs-3'>10,760</p>
                                </div>
                                <Button onClick={async ()=>{  setStatus('loading');
                                    await new Promise(resolve => setTimeout(resolve, 2000));
                                setStatus('default')}} className='mt-2  rounded-4 bg-white Text-unicorn border-white'>
                                    {t('Clim')}
                                </Button>
                            </div>}
                        <p style={{color: 'lightgrey'}}>Получи 10% от друзей + 2,5% от их рефералов</p>
                        <p style={{color: 'lightgrey'}}>Получи билет <img src={ticket}/> на игру за каждого друга</p>
                        <h3 className='text-start text-white ps-2'>{fr} {t('friend')}</h3>

                      <div className='w-100 d-flex p-2 mb-2 justify-content-between text-start li-unicorn'>
                          <div className='d-flex'>
                              <div>
                                  <img width={35} src={user}/>
                              </div>
                              <div className='text-white'>
                                 John<br/>
                                 <small><HiOutlineUsers /> 0</small>
                              </div>
                          </div>
                          <div className='d-flex'>
                              <img width={20} src={coin}/>
                              <p className='pt-3 text-white'>445,200</p>
                          </div>
                      </div>
                        <div>
                            <Modal isOpen={isModalOpen} onClose={closeModal} t={t}>
                                <Button onClick={handleShare} className='Text-unicorn m-1 w-100'
                                        variant="light">{t('Send')}</Button>
                                <Button onClick={handleCopy} className='Text-unicorn m-1 w-100'
                                        variant="light">{t('Copy link')}</Button>
                                <button onClick={closeModal}
                                        className='closeButton text-white fs-6 pt-1'>{t('Close')}</button>
                            </Modal>
                        </div>
                        {isModalOpen?'':
                        <div className='mb-5 fixed-bottom'>
                            <Button onClick={openModal} className='mb-3 mb-1 Text-unicorn w-100'
                                    variant="light">{t('Invite a friend (1 left)')}</Button>
                        </div>}

                    </div>
                    : <div className='p-2'>
                        <p className='pt-3 text-start text-white fs-5 '>{t('How does this work')}</p>
                        <div className='d-flex ms-2 pb-5 pt-4 mb-5'>
                            <img style={{height: 220}} src={dotLine} className='pt-3 m-1' alt='family'/>
                            <div className='text-white text-start ps-1'>
                                <div className='pb-3'>
                                    <small className='fs-5'>{t('Share the invite link')}</small><br/>
                                    <small>{t('Get a ticket')}</small> <img src={ticket}/>
                                    <small>{t('to the game for every friend')}</small>
                                </div>
                                <br/>
                                <div className='pb-3'>
                                <small className='fs-5'>{t('Your friend joins the game')}</small><br/>
                                    <small>{t('And starts earning points')}</small>
                                </div>
                                <br/>
                                <div className='pb-3'>
                                    <small className='fs-5'>{t('Get 10% from every friend')}</small><br/>
                                    <small>{t('Plus an additional 2.5% from their referrals')}</small>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Modal isOpen={isModalOpen} onClose={closeModal} t={t}>
                                <Button onClick={handleShare} className='Text-unicorn m-1 w-100'
                                        variant="light">{t('Send')}</Button>
                                <Button onClick={handleCopy} className='Text-unicorn m-1 w-100'
                                        variant="light">{t('Copy link')}</Button>
                                <button onClick={closeModal}
                                        className='closeButton text-white fs-6 pt-1'>{t('Close')}</button>
                            </Modal>
                        </div>
                        <Button onClick={openModal} className='mt-5 mb-1 Text-unicorn w-100'
                                variant="light">{t('Invite a friend (2 left)')}</Button>
                    </div>
                }
                <Navbar/>

            </div>
        </div>
    );
}

export default Friends;