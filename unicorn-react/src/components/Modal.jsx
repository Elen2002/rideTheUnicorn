import React from 'react';
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";

const Modal = ({ isOpen, onClose, t, children, header, h }) => {
    if (!isOpen) return null;
    return (
        <div className='overlayStyle'>
            <div className='modalStyle' style={h?{height: h}: {}}>
                <div className='modal-header'>
                    <p className='text-white fs-5 align-content-center w-100'>{header?header:t('Invited friends')}</p>
                </div>
                <button onClick={onClose} className='closeButtonStyle text-white fs-1'>×</button>
                <hr style={{color: '#B283FF80'}} className='border-2'/>
                {children}
            </div>
        </div>
    );
};

export default Modal;
