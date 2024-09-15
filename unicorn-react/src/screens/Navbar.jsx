import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import unicorn from "../images/icons/tab-unicorn.svg";
import earn from "../images/icons/tab-earn.svg";
import friends from "../images/icons/tab-friends.svg";
import {useTranslation} from "react-i18next";

function Navbar({bg}) {
    const {t} = useTranslation("global");
    const currentPath = window.location.pathname;
    return (
        <div className='d-flex fixed-bottom justify-content-center align-items-center' style={bg?{background:bg, maxWidth: "760px"}:{maxWidth: "760px"}}>
            <Link to="/" className='grid-item'>
                <Button className={`btn-unicorn-tab w-px-100 pb-0 ms-4 me-3 ps-4 pe-4 ${currentPath === '/' ? 'active' : ''}`}>
                    <img src={unicorn}/>
                    <p style={t('Friends').length > 3 ? {fontSize: 16}: {} } className='p-0 mb-1'>{t('Home')}</p>
                </Button>
            </Link>
            <Link to="/earn" className='grid-item'>
                <Button className={`btn-unicorn-tab text-center w-px-100 pb-0 me-3 pe-4 ${currentPath === '/earn' ? 'active' : ''}`}>
                <img src={earn}/>
                <p style={t('Earn').length > 3 ? {fontSize: 16}: {} } className='p-0 mb-1 text-center'>{t('Earn')}</p>
            </Button></Link>
            <Link to="/friends" className='grid-item'>
                <Button className={`btn-unicorn-tab w-px-100 pb-0 me-3 ps-4 pe-4 ${currentPath === '/friends' ? 'active' : ''}`}>
                <img src={friends}/>
                <p style={t('Friends').length > 3 ? {fontSize: 16}: {} }  className='p-0 mb-1'>{t('Friends')}</p>
            </Button></Link>
        </div>
    );
}

export default Navbar;
