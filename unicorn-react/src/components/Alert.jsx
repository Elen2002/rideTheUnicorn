import React from 'react';
import {IoMdCheckmarkCircleOutline} from "react-icons/io";

const Alert = ({ isOpen, children }) => {
    if (!isOpen) return null;
    return (
        <div className='position-absolute d-flex flex-column align-items-center w-100 '>
            <div className='d-flex rounded-3 m-3 mt-5 p-2' style={{color: '#592BA2', width: '90%', background: '#F2F2F5'}}>
                <IoMdCheckmarkCircleOutline className='fs-3 me-3'/>
                {children}
            </div>
        </div>
    );
};

export default Alert;