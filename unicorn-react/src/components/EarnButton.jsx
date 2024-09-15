import React, {useState} from 'react';
import loading from "../images/loading.svg";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {Button} from "react-bootstrap";

const EarnButton = ({children, fn} ) =>  {
    const [status, setStatus] = useState('default')
    const handleClick = async () => {
        setStatus('loading');
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (fn){
            fn()
        }
        setStatus('success');
        setTimeout(() => setStatus('default'), 4000);
    };
    return (
        <Button
            onClick={handleClick}
            className={
                status === 'success' ? 'mt-2 rounded-4 p-0 btn-success' :
                    status === 'loading' ? 'p-0 rounded-4 bg-white border-white' :
                        'mt-2 rounded-4 bg-white border-white'
            }
            style={
                status === 'success' || status === 'loading'
                    ? { width: '60px', height: '30px' }
                    : { height: '40px' }
            }
        >
            {status === 'default' ? (
                <p className='Text-unicorn fs-7'>
                    {children}
                </p>
            ) : status === 'loading' ? (
                <img src={loading} alt="Loading" />
            ) : (
                <IoIosCheckmarkCircle className='fs-4' />
            )}
        </Button>
    );
}

export default EarnButton;