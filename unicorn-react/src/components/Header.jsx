import React from 'react';
import {Link} from "react-router-dom";
import {Button, Dropdown} from "react-bootstrap";
import icon_unicorn from "../images/icons/icon-unicorn.svg";
import {useTranslation} from "react-i18next";
import {FaQuestionCircle} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {setSignOut} from "../redux/slices/authSlice";
import {API_URL_IMAGE} from "../utils/global";
import user from "../images/icons/user.jpg";

function Header() {
    const {t, i18n } = useTranslation('global')
    const dispatch = useDispatch()
    const userData = useSelector(state => {
        return state.userAuth
    })
    localStorage.getItem('i18nextLng')
    const _handleSignOut =()=> {
        dispatch(setSignOut());
        localStorage.clear();
    }
    return (
        <div className='d-flex justify-content-between p-2'>
            <div className='d-flex'>
                        {userData.avatar ?
                            <img
                                src={API_URL_IMAGE + userData.avatar}
                                className="rounded-3"
                                style={{width: "40px", height: '40px'}}
                            /> :
                            <img
                                src={user}
                                className="rounded-3"
                                style={{width: "40px", height: '40px'}}
                            />
                        }
                <label className='text-white p-2'>{userData.username}</label>
            </div>
            <nav>
                <Link className='me-2' to="/exchange"><Button className='btn btn-unicorn'><img style={{width: "20px", height: '20px'}} src={ localStorage.getItem('exchange')?localStorage.getItem('exchange'):icon_unicorn} /> </Button></Link>
                <Link className='me-2' to="/register"><Button onClick={_handleSignOut} className='btn btn-unicorn'><FaQuestionCircle className='fs-6' /></Button></Link>
                <Link className='me-2' to="/languages"><Button className='btn btn-unicorn'>{i18n.language}</Button></Link>
            </nav>
        </div>
    );
}

export default Header;