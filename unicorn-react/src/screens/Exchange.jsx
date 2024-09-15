import React, {useEffect} from 'react';
import {ListGroup} from "react-bootstrap";
import Bin from "../images/iconExchange/Binance.svg";
import Bybin from "../images/iconExchange/bybit.svg";
import okx from "../images/iconExchange/okx.svg";
import bing from "../images/iconExchange/bingx.svg";
import htx from "../images/iconExchange/htx.svg";
import kocion from "../images/iconExchange/Kocion.svg";
import gate from "../images/iconExchange/gate.svg";
import mexc from "../images/iconExchange/mexc.svg";
import bitget from "../images/iconExchange/bitget.svg";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {useTranslation} from "react-i18next";
import {IoCheckmark} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

function Exchange() {
    const {t} = useTranslation('global')
    const navigate = useNavigate();
    let exchange =  localStorage.getItem('exchange')
    const changeExchange = (item)=>{
        localStorage.setItem('exchange', item)
        navigate('/')
    }
    return (
        <div style={{height: '100vh'}}>
            <h4 className='mt-2 text-white'>{t('Change exchange')}</h4>
            <ListGroup>
                <ListGroup.Item className='p-3 m-2 mb-0 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Bin}/>
                        <label className='pt-1 ps-1 text-white'>Binance</label>
                    </div>
                    { exchange === Bin?
                        <IoCheckmark className='fs-2 text-white'  />:
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(Bin)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={Bybin}/>
                        <label className='pt-1 ps-1 text-white'>ByBit</label>
                    </div>
                    { exchange === Bybin?
                        <IoCheckmark className='fs-2 text-white'  />:
                    <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(Bybin)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={okx}/>
                        <label className='pt-1 ps-1 text-white'>OKX</label>
                    </div>
                    { exchange === okx?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(okx)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={bing}/>
                        <label className='pt-1 ps-1 text-white'>BingX</label>
                    </div>
                    { exchange === bing?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(bing)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={htx}/>
                        <label className='pt-1 ps-1 text-white'>HTX</label>
                    </div>
                    { exchange === htx?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(htx)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={kocion}/>
                        <label className='pt-1 ps-1 text-white'>Kucoin</label>
                    </div>
                    { exchange === kocion?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(kocion)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={gate}/>
                        <label className='pt-1 ps-1 text-white'>Gate.io</label>
                    </div>
                    { exchange === gate?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(gate)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={mexc}/>
                        <label className='pt-1 ps-1 text-white'>MEXC</label>
                    </div>
                    { exchange === mexc?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(mexc)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
                <ListGroup.Item className='mb-0 p-3 m-2 li-unicorn text-start  d-flex align-items-center justify-content-between'>
                    <div>
                        <img src={bitget}/>
                        <label className='pt-1 ps-1 text-white'>Bitget</label>
                    </div>
                    { exchange === bing?
                        <IoCheckmark className='fs-2 text-white'  />:
                        <MdOutlineKeyboardArrowRight onClick={()=>{changeExchange(bing)}} className='fs-2 text-white' />
                    }
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Exchange;