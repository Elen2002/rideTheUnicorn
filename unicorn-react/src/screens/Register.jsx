import React, {useState} from 'react';
import {Button,  InputGroup} from "react-bootstrap";
import {PiPencilSimpleLight} from "react-icons/pi";
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import src from '../images/unicorn.svg'
import {FaChevronRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {IoCheckmarkCircle, IoCloseCircle} from "react-icons/io5";
import {API_URL} from "../utils/global";
import stringify from "qs-stringify";
import {useDispatch, useSelector} from "react-redux";
import {setSignIn} from "../redux/slices/authSlice";

function Register() {
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const [avatar, setAvatar] = useState(null);
    const [avatarName, setAvatarName] = useState(null);
    const [current, setCurrent] = useState(null);
    const dispatch = useDispatch();
    const [currentText, setCurrentText] = useState('');
    const [username, setUsername] = useState('');

    let newValue;
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                setAvatarName(file.name)
            };
            reader.readAsDataURL(file);
        }
    };
    const handleInputChange = (event) => {
        newValue = event.target.value;
        if (newValue.length >= 4) {
            getData();
        }else{
            setCurrent(false)
            setCurrentText('Company name must be more than 4 characters')
        }
    }
    const getData =  async () => {
        const response = await fetch(API_URL + '/user/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({username: newValue})
        })
        const json = await response.json();
        if (json.status) {
            if (json.res === false) {
                setCurrent(false)
                setCurrentText('username already taken')
                setCurrent(false)
            } else {
                setCurrentText('Good one! That’s available')
                setUsername(newValue)
                setCurrent(true)
            }
        }
    }
    const setData =  async () => {
        let sendObj = {
            username: username,
            avatar: avatar,
            avatarName: avatarName,
        }
        const response = await fetch(API_URL + '/user/new', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify(sendObj)
        })
        const json = await response.json();
        if (json.status) {
            let newAvatar
            let data =  json.data;
            if (data.username) {
                localStorage.setItem('username', data.username);
            }
            if (data.avatar) {
                newAvatar = data.avatar.split('/public')[1]
                localStorage.setItem('avatar', newAvatar);
            }
            if (data.id) {
                localStorage.setItem('id', data.id);
            }
            if (data.userToken) {
                localStorage.setItem('userToken', data.token);
            }
            localStorage.setItem('level', 0);
            localStorage.setItem('coins', 0);
            dispatch(setSignIn({isLoggedIn: true, userToken: data.token, id: data.id, username: data.username,
                avatar: newAvatar}));
           navigate('/slider')
        }
    }
    return (
        <div>
            <div className='top-0 text-white'>
                <p>Ride the Unicorn
                    <br/>
                    <small>бот</small>
                </p>
            </div>
            <div className="App-header">
                <h3>
                    Boom! Добро пожаловать в команду Unicorn!
                </h3>
                <div className='rounded-circle circle image-back-i'>
                    {avatar && <img src={avatar} alt="Preview" className='img-radio rounded-circle circle image-back-i' />}
                </div>
                <div className="file-upload">
                    <input
                        type="file"
                        id="file-input"
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <label htmlFor="file-input" className="p-2 button-reg file-label">
                        < PiPencilSimpleLight/>
                        <span>Изменить</span>
                    </label>
                </div>
                <div className='p-1 pt-3 text-start w-100 p-3'>
                    <label>{t('companyName')}</label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleInputChange}
                            className={current ===true? 'bg-unicorn border-success border-3 text-white':
                                current===false?'bg-unicorn border-danger border-3 text-white':'bg-unicorn text-white'}
                            aria-describedby="basic-addon3"/>
                        {current ===true?
                            <InputGroup.Text className='bg-icon border-3 border-success' id="basic-addon3">
                                <IoCheckmarkCircle className='text-success fs-3'/>
                            </InputGroup.Text>:
                            current===false?
                                <InputGroup.Text className='bg-icon border-3 border-danger' id="basic-addon3">
                                    <IoCloseCircle className='text-danger fs-3'/>
                                </InputGroup.Text>:
                                <InputGroup.Text className='bg-icon' id="basic-addon3">
                                </InputGroup.Text>
                        }
                    </InputGroup>
                    <small className={current ===true?'text-success':'text-danger'}>{t(currentText)}</small>
                </div>
                <div className='w-100 p-3'>
                    { current?
                    <Button onClick={() => {setData()}} className='Text-unicorn w-100' variant="light">Продолжить <FaChevronRight/></Button>:
                    <Button className='disabled Text-unicorn w-100' variant="light">Продолжить <FaChevronRight/></Button>}
                </div>
            </div>
        </div>
    );
}

export default Register;