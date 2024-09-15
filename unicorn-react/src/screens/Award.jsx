import React, {useEffect, useState} from 'react';
import src from '../images/icons/lightning.svg'
import coinSrc from '../images/icons/coin.svg'
import ticketSrc from '../images/icons/ticket.svg'
import {Button} from "react-bootstrap";
import {FaChevronRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
function Award() {
    const navigate = useNavigate()
    const [tickets, setTickets] = useState(1)
    const [coin, setCoin] = useState(10)
    let visitedDays = localStorage.getItem('visitedDays')
    let coins = localStorage.getItem('coins')
    let ticket = localStorage.getItem('tickets')
    useEffect(() => {
        if (visitedDays > 2){
            setCoin(70)
            setTickets(7)
            let newCoins = +coins + coin
            let newTicket = +ticket + tickets

            localStorage.setItem('coins', newCoins)
            localStorage.setItem('tickets', newTicket)
        }else
        if (visitedDays == 2){
            setCoin(20)
            setTickets(2)
            let newCoins = +coins + coin
            let newTicket = +ticket + tickets

            localStorage.setItem('coins', newCoins)
            localStorage.setItem('tickets', newTicket)
        }else{
        let newCoins = +coins + coin
        let newTicket = +ticket + tickets

        localStorage.setItem('coins', newCoins)
        localStorage.setItem('tickets', newTicket)}
    }, []);
    return (
        <div className='p-3'>
            <div className='top-0 text-white'>
                <p>Ride the Unicorn
                    <br/>
                    <small>бот</small>
                </p>
            </div>
            <div className="App-header">
            <img src={src}/>
            <h1 className='text-white mt-4 mb-5'>Твои ежедневные награды</h1>
            <div  className='d-flex justify-content-between p-4'>
                <div style={{border: '1px solid #B283FF80'}} className='btn-unicorn ps-5 pe-5 p-0 me-3' >
                    <img className='mt-4' style={{width: '70%'}} src={coinSrc}/>
                    <p className='fs-2 p-0 m-0'>{coin}</p>
                    <small style={{fontSize: '12px'}} className='p-0 m-0'>XLVN Points</small>
                </div>
                <div style={{border: '1px solid #B283FF80'}} className='btn-unicorn ps-5 pe-5  p-0'>
                    <img className='mt-4' style={{width: '70%'}} src={ticketSrc}/>
                    <p className='fs-2 p-0 m-0'>{tickets}</p>
                    <small style={{fontSize: '12px'}} className='p-0 m-0'>Play Passes</small>
                </div>
            </div>
            <small className='text-white m-3'>Возвращайся завтра за новым бонусом.
                Пропуск одного дня приводит к сбросу повышенных бонусов</small>
            <Button onClick={()=>{navigate('/')}} className='Text-unicorn w-100 mt-1' variant="light">Продолжить <FaChevronRight/></Button>
        </div>
        </div>

    )
}

export default Award;