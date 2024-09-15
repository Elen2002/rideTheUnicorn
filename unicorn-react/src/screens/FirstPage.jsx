import React from 'react';
import logo from "../images/unicorn.svg";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import sss from '../images/image-game.svg'

function FirstPage() {
    const navigate = useNavigate();
    return (
        <div className="p-3">
            <div className='top-0 text-white'>
                <p>Ride the Unicorn
                    <br/>
                    <small>бот</small>
                </p>
            </div>
            <div className="App-header">
                <img src={logo} alt="logo"/>
                <p>
                    <h2 className='m-5'>Добро пожаловать в Ride the Unicorn</h2>
                    Стань игроком с самой влиятельной и успешной компанией-единорогом в мире. Поехали!
                </p>
                <Button onClick={() => {
                    navigate('/register')
                }} className='w-100 Text-unicorn' variant="light">Создать компанию</Button>
            </div>
        </div>
    );
}

export default FirstPage;