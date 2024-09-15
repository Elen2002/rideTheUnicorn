import Confetti from "react-confetti-boom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function DayCheck() {
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);
    let visitedDays = localStorage.getItem('visitedDays')

    useEffect(() => {
       setTimeout(() => {
            navigate('/award');
        }, 4000);
        setTimeout(() => {
            setShowConfetti(false)
        }, 2500);
    })
return (
    <div>
        <div className='top-0 text-white'>
            <p>Ride the Unicorn
                <br/>
                <small>бот</small>
            </p>
        </div>
    <div className='App-header'>
        <div>
            <p style={{fontSize: '80px'}}>{visitedDays}</p>
            <p className='fs-1'>day check-in</p>
        </div>
        {showConfetti ? (
        <Confetti mode="boom"
                  particleCount={300}
                  shapeSize={15}
                  beg={266}
                  effectCount={41}
                  y={0.62}
                  effectInteral={10000}
                  spreadDeg={50}
                  recycle={false}
                  launchSped={2}
                  colors={['#6DD0E7', '#F44274', '#B4DF86', '#FBE422', '#F8B54A']}/>
            ):
            (<div></div>)
        }
    </div>
    </div>
)
}

export default DayCheck;