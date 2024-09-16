import React, {useEffect, useState} from 'react';
import img from '../images/unicorn-click.svg';
import Navbar from "./Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";
import user from "../images/icons/user.jpg";
import {HiOutlineUsers} from "react-icons/hi";
import coin from "../images/icons/coin.svg";
import {ListGroup} from "react-bootstrap";
import {API_URL, API_URL_IMAGE} from "../utils/global";
import stringify from "qs-stringify";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";

function Liga() {
    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState([])
    let ids = []
    const [currentIndex, setCurrentIndex] = useState(0);
    let colors = ['#6B7D90','#B15A28', "#E1CB09", '#C6C6C6', '#768CA3', '#00C2DA', '#462DF0', '#008C78', '#FF66B0', '#A810FF', '#28DBEE', '#3E60FF']
    function getRandomColor(colors) {
        let randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    const stylesElips = {
        position: 'absolute',
        width: '268px',
        height: '323px',
        left: 'calc(50% - 268px / 2)',
        top: 'calc(50% - 323px / 2)',
        background: getRandomColor(colors),
        filter: 'blur(75px)',
    };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ids.length);
        getData(ids[currentIndex])
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + ids.length) % ids.length);
        getData(ids[currentIndex])
    };

    const getUsers = async () => {
        const response = await fetch(API_URL + '/user/all', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            // body: stringify({coins: coins, level: level, id: localStorage.getItem('id')})
        })
        const json = await response.json();
        if (json.status){
            setUsers(json.data)
        }else{
            console.log(json)
        }
    }
    const getData = async (id) => {
        const response = await fetch(API_URL + '/user/one', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: stringify({id: id})
        })
        const json = await response.json();
        if (json.status){
            setUserData(json.data)

        }else{
            console.log(json)
        }
    }
    useEffect(() => {
        getUsers()
    }, []);
    return (
        <div className='App-header p-2 mb-5'>
            <div className='position-relative'>
                <div style={stylesElips}/>

                <div className='position-relative'>
                    <div className='position-absolute w-100'>
                        <MdOutlineKeyboardArrowLeft onClick={prevSlide} style={{left: -110, position:'absolute', top: 100}} size={30}/>
                        <MdOutlineKeyboardArrowRight onClick={nextSlide} style={{right: -110, position:'absolute', top: 100}} size={30}/>
                    </div>
                    <div className='rounded-3' style={{border: '4px solid rgba(186, 107, 63, 0.5)'}}>
                        <div className='rounded-3'
                             style={{background: '#BA6B3F'}}>
                            <img width={150} src={userData.avatar ? API_URL_IMAGE + userData.avatar : img}/>
                        </div>
                    </div>
                    <p className='text-white'>{userData.username ? userData.username : 'Unicorn'}</p>
                    <small>{userData.coins ? userData.coins : 0}</small>
                </div>
            </div>
            <ProgressBar variant="secondary" animated className='ms-2 w-100 me-2' now={100}/>
            <ListGroup className='w-100 mt-4'>
                {users ? users.map(item => {
                    ids.push(item.id)
                    return(
                    <ListGroup.Item onClick={()=>{getData(item.id)}} className='w-100 d-flex p-2 mb-2 justify-content-between text-start li-unicorn'>
                        <div className='d-flex'>
                            <div className='mt-2'>
                                <img width={35} src={item.avatar? API_URL_IMAGE + item.avatar: img}/>
                            </div>
                            <div className='text-white ps-2'>
                                {item.username}<br/>
                                    <img width={16} src={coin}/> {item.coins?item.coins:0}
                            </div>
                        </div>
                        <h2 className='text-white pt-4'>{item.level}</h2>
                    </ListGroup.Item>
                )}):''}

            </ListGroup>
            <Navbar bg={'#431D82'}/>
        </div>
    );
}

export default Liga;