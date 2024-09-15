import React from 'react';
import {Button, ListGroup} from "react-bootstrap";
import En from '../images/languages/En.svg'
import De from '../images/languages/De.svg'
import Es from '../images/languages/Es.svg'
import Fr from '../images/languages/Fr.svg'
import Hi from '../images/languages/Hi.svg'
import Id from '../images/languages/Id.svg'
import Pt from '../images/languages/Pt.svg'
import Ru from '../images/languages/Ru.svg'
import Th from '../images/languages/Th.svg'
import Thv from '../images/languages/Thv.svg'
import Tl from '../images/languages/Tl.svg'
import Tr from '../images/languages/Tr.svg'
import Zh from '../images/languages/Zh.svg'
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {changeLanguage} from "i18next";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";


function Language(props) {
    const navigate = useNavigate();
    const{t, i18n} = useTranslation("global")
    const dispatch = useDispatch();
    const changeLanguage = (language)=>{
        localStorage.setItem('i18nextLng', language);
        i18n.changeLanguage(language).then(()=>{
            navigate('/')
        });
    }
    return (
        <div>
            <h4 className='mt-2 text-white'>{t('Change language')}</h4>
            <ListGroup>
                <ListGroup.Item className='mb-1 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={En}/>
                        <label className='pt-1 ps-1 text-white'>English (en)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('En') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Es}/>
                        <label className='pt-1 ps-1 text-white'>Español (es)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Es') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Hi}/>
                        <label className='pt-1 ps-1 text-white'>हिन्दी (Hindi) (hi)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Hi') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Id}/>
                        <label className='pt-1 ps-1 text-white'>Bahasa Indonesia (id)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Id') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Pt}/>
                        <label className='pt-1 ps-1 text-white'>Português (pt)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Pt') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Ru}/>
                        <label className='pt-1 ps-1 text-white'>Русский (ru)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Ru') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Th}/>
                        <label className='pt-1 ps-1 text-white'>ภาษาไทย (Thai) (th)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Th') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Tl}/>
                        <label className='pt-1 ps-1 text-white'>Tagalog (tl)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Tl') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Tr}/>
                        <label className='pt-1 ps-1 text-white'>Türkçe (tr)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Tr') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Thv}/>
                        <label className='pt-1 ps-1 text-white'>Tiếng Việt (th)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Thv') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Zh}/>
                        <label className='pt-1 ps-1 text-white'>中文 (China) (zh)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Zn') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Fr}/>
                        <label className='pt-1 ps-1 text-white'>Français (fr)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeLanguage('Fr') }} className='fs-2 text-white' />
                </ListGroup.Item>
                <ListGroup.Item className='mb-1 p-3 m-2 mt-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={De}/>
                        <label className='pt-1 ps-1 text-white'>Deutsch (de)</label>
                    </div>
                    <MdOutlineKeyboardArrowRight className='fs-2 text-white' />
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Language;