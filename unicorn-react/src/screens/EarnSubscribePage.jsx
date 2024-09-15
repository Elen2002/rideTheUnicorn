import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import coin from '../images/icons/coin.svg'
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useLocation, useNavigate} from "react-router-dom";

function EarnSubscribePage() {
    const {t} = useTranslation('global')
    const location = useLocation();
    const [header, setHeader] = useState()
    const [task, setTask] = useState()
    const [coins, setCoins] = useState()
    const [card, setCard] = useState()
    const [url, setUrl] = useState('')
    const [page, setPage] = useState('')
    const { state } = location;
    const navigate = useNavigate()
    const [text, setText] = useState()
    useEffect(()=>{
        if (state){
            setHeader(state.header || '')
            setTask(state.task || '')
            setCoins(state.coins || '')
            setCard(state.card || '')
            setPage(state.page || '')
            setUrl(state.url || '')
        }
    }, [])
    const HtmlRenderer = ({ html }) => (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );

    return (
        <div className='App-header'>
            <div style={{background: '#431D82'}} className='top-0 pb-3 fixed-top text-white'>
                <p className='m-0'>Ride the Unicorn
                    <br/>
                    <small>бот</small>
                </p>
            </div>
            <div className='p-3 w-100'>
                <div className='text-start'>
                    <HtmlRenderer html={header} />
                </div>
            <div className='w-100 d-flex p-2 text-start li-unicorn'>
                <img width={35} className='me-2' src={coin}/>
                <div>
                    <p className='p-0 m-0 fs-6'>{t('Reward')}</p>
                    <small className='fs-7 p-0 m-0'>{coins}</small>
                </div>
            </div>
            <h4 className='w-100 mt-4 text-start'>{t('Your tasks')}</h4>
                <HtmlRenderer html={card} />
            <div className='li-unicorn p-1'>
                <div className='card-header text-start d-flex'>
                    <p className='w-75'>
                        <HtmlRenderer html={task} /></p>
                    {card?'':<div className='align-content-center text-center'>
                        <Button onClick={()=>{window.open(url)}} className='mt-2  rounded-4 bg-white Text-unicorn border-white'>
                          {t('Start')}
                        </Button>
                    </div>}
                </div>
                <hr className='mt-0'/>
                <div className='body text-start'>
                    <p className='text-white'>{text == ''? t('text is empty'): ''}</p>
                    <input
                        onChange={(e) => setText(e.target.value)}
                        className='form-control-unicorn w-100 p-2 text-white'
                        placeholder={t('Input text')}
                        aria-describedby="basic-addon3"/>
                    <Button onClick={()=>{
                        if(text != ''){
                            navigate('/earn', {state: {page:page}})
                        }}} className='mt-2 rounded-5 bg-white Text-unicorn border-white'>
                        {t('Send')}
                    </Button>
                </div>
            </div>
            </div>
            <Navbar bg={'#431D82'}/>
        </div>
    );
}

export default EarnSubscribePage;