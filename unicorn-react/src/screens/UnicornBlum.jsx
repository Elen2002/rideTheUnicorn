import React, { useEffect, useRef, useState } from 'react';
import background from "../images/gameImag/unicornBlum/backgroundImg.png";
import coinImgSrc from '../images/gameImag/unicornBlum/coins.png';
import bombImgSrc from '../images/gameImag/unicornJump/bomb.png';
import coinUnicornImgSrc from '../images/gameImag/unicornBlum/uCoin.png';
import uCircle from '../images/gameImag/unicornBlum/unicorn.png';
import imgCoin from '../images/icons/coin.svg';
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

function UnicornBlum() {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [tickets, setTickets] = useState(Number(localStorage.getItem('tickets')) || 0);
    const [allCoins, setAllCoins] = useState(Number(localStorage.getItem('coins')) || 0);
    let coins = +localStorage.getItem('coinsSum');
    const navigate = useNavigate()
    const [highlightCoins, setHighlightCoins] = useState(false); // State to highlight coins temporarily
    const [plusCoin, setPlusCoin] = useState(1); // Coin value for click
    const [remainingTime, setRemainingTime] = useState(+localStorage.getItem('BloomTimer')); // Initialize with 30 seconds
    const [timerActive, setTimerActive] = useState(false); // Flag to control timer

    // Board settings
    const boardWidth = 400;
    const boardHeight = 700;
    let context;

    // Platform settings
    let normalPlatforms = [];
    let fastPlatforms = [];
    const coinWidth = 20;
    const coinHeight = 20;
    const bombWidth = 40;
    const bombHeight = 40;
    const circleRadius = 20;
    let coinImg = new Image();
    let bombImg = new Image();
    let uCircleImg = new Image()
    uCircleImg.src = uCircle
    // Speed settings
    const totalTime = 22000;
    const fps = 60;
    const totalFrames = (totalTime / 1000) * fps;
    const minSpeed = boardHeight / totalFrames;
    const maxSpeed = minSpeed * 2;
    const fastSpeed = minSpeed * 3;

    const minDistance = 50;
    const maxDistance = 100;

    // State to manage visibility of red circles
    const [hiddenCircles, setHiddenCircles] = useState([]);
    const drawEllipse = (x, y, width, height, blur) => {
        context.clearRect(0, 0, boardWidth, boardHeight);
        context.beginPath();
        context.ellipse(x, y, width / 2, height / 2, 0, 0, 2 * Math.PI);
        context.fillStyle = '#B60000';
        context.filter = `blur(${blur}px)`;
        context.fill();
        context.filter = 'none';
    };
    useEffect(() => {
        if (tickets == 0){
            navigate('/game/over');
        }
        // Set up the canvas and images
        const board = canvasRef.current;
        context = board.getContext('2d');

        coinImg.src = coinImgSrc;
        bombImg.src = bombImgSrc;
        // Ensure images are loaded before starting the game
        const imageLoadPromises = [new Promise(resolve => coinImg.onload = resolve), new Promise(resolve => bombImg.onload = resolve)];
        Promise.all(imageLoadPromises).then(() => {
            placePlatforms();
            requestAnimationFrame(update);
        });

        board.addEventListener('click', handleCanvasClick);
        if (!gameOver){
            startTimer();
        }
        return () => {
            board.removeEventListener('click', handleCanvasClick);
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [gameOver, highlightCoins, hiddenCircles]);

    function startTimer() {
        setTimerActive(true);
        timerInterval = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
            localStorage.setItem('BloomTimer',remainingTime)
        }, 1000);
    }

    let timerInterval; // Reference for the timer interval


    function update() {
        requestAnimationFrame(update);

        if (gameOver) {
            drawEllipse(boardWidth/2,boardHeight / 2, boardWidth, boardHeight, 90.5);
            return;
        }

        context.clearRect(0, 0, boardWidth, boardHeight);

        // Update and draw normal platforms
        normalPlatforms.forEach(cn => {
            cn.y += cn.speed;
            let coinUnicornImg = new Image();
            coinUnicornImg.src = coinUnicornImgSrc;
            if (highlightCoins && cn.type === 'normal') {
                context.drawImage(coinUnicornImg, cn.x, cn.y, cn.width, cn.height);
            } else {
                context.drawImage(cn.img, cn.x, cn.y, cn.width, cn.height);
            }

            if (cn.y > boardHeight) {
                cn.y = -cn.height;
                cn.x = Math.floor(Math.random() * (boardWidth - cn.width)); // Randomize new X position
                cn.type = getRandomPlatformType();
                cn.img = getPlatformImage(cn.type); // Update image based on type
                cn.speed = getPlatformSpeed(); // Update speed
                const platformData = getPlatformWithHeight(cn.type);
                cn.width = platformData.width;
                cn.height = platformData.height;
            }
        });

        // Update and draw fast red circles
        fastPlatforms.forEach(cn => {
            if (!hiddenCircles.includes(cn)) { // Check if circle is hidden
                cn.y += fastSpeed; // Move down faster

                context.drawImage(uCircleImg, cn.x, cn.y, circleRadius * 2, circleRadius * 2); // Draw unicorn circle image

                if (cn.y > boardHeight) {
                    cn.y = -circleRadius * 2;
                    cn.x = Math.floor(Math.random() * (boardWidth - circleRadius * 2)); // Randomize new X position
                }
            }
        });

        // Add new platforms if needed
        if (normalPlatforms.length < 10) {
            newPlatform();
        }
        if (fastPlatforms.length < 1) {
            newFastPlatform();
        }
    }


    function handleCanvasClick(event) {
        if (gameOver) {
            setGameOver(false);
            setRemainingTime(30)
            setTickets(tickets - 1);
            setAllCoins(allCoins + coins);
            localStorage.setItem('tickets', tickets - 1);
            localStorage.setItem('coins', allCoins + coins);
            localStorage.setItem('coinsSum', 0)
            placePlatforms();
            // Do not restart the timer
            return;
        }

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Check if a red circle was clicked
        let redCircleClicked = false;
        fastPlatforms = fastPlatforms.map(cn => {
            const isClicked = Math.sqrt((clickX - (cn.x + circleRadius)) ** 2 + (clickY - (cn.y + circleRadius)) ** 2) < circleRadius;

            if (isClicked) {
                redCircleClicked = true;
                setPlusCoin(2); // Set flag if red circle is clicked
                setHiddenCircles(prev => [...prev, cn]); // Hide the clicked circle
                setTimeout(() => {
                    setHiddenCircles(prev => prev.filter(circle => circle !== cn)); // Reappear after 3 seconds
                }, 3000);
                if (timerInterval) {
                    clearInterval(timerInterval); // Stop the timer
                    setTimerActive(false); // Mark the timer as inactive
                }
            }

            return cn;
        });

        if (redCircleClicked) {
            setHighlightCoins(true); // Highlight coins
            setTimeout(() => {
                setHighlightCoins(false);
                setPlusCoin(1);
            }, 8000);
            return;
        }

        normalPlatforms = normalPlatforms.map(cn => {
            const isClicked = clickX > cn.x && clickX < cn.x + cn.width &&
                clickY > cn.y && clickY < cn.y + cn.height;

            if (isClicked) {
                if (cn.type === 'bomb') {
                    setGameOver(true);
                } else {
                    coins += plusCoin
                    localStorage.setItem('coinsSum', coins)
                    let type = getRandomPlatformType();
                    let platformData = getPlatformWithHeight(type);
                    return {
                        img: getPlatformImage(type), // Random new type for clicked cn
                        x: Math.floor(Math.random() * (boardWidth - coinWidth)), // Random X position
                        y: -platformData.height, // Start off-screen
                        width: platformData.width,
                        height: platformData.height,
                        type: type,
                        speed: getPlatformSpeed() // Assign a new speed
                    };
                }
            }

            return cn; // Return unmodified cn
        });
    }

    function getRandomPlatformType() {
        const types = ['normal', 'normal', 'normal', 'bomb'];
        return types[Math.floor(Math.random() * types.length)];
    }

    function getPlatformSpeed() {
        // Return either minSpeed or maxSpeed based on a 50% chance
        return Math.random() < 0.5 ? minSpeed : maxSpeed;
    }

    function placePlatforms() {
        normalPlatforms = [];
        let yPosition = boardHeight - coinHeight; // Start with a position at the bottom

        for (let i = 0; i < 10; i++) { // Initial number of normal platforms
            let randomX = Math.floor(Math.random() * (boardWidth - coinWidth));
            let type = getRandomPlatformType();

            let platformData = getPlatformWithHeight(type);

            let cn = {
                img: getPlatformImage(type),
                x: randomX,
                y: yPosition,
                width: platformData.width,
                height: platformData.height,
                type: type,
                speed: getPlatformSpeed() // Set initial speed
            };

            normalPlatforms.push(cn);
            yPosition -= platformData.height + Math.floor(Math.random() * (maxDistance - minDistance) + minDistance);
        }
    }

    function newPlatform() {
        let randomX = Math.floor(Math.random() * (boardWidth - coinWidth));
        let type = getRandomPlatformType();
        let platformData = getPlatformWithHeight(type);
        let cn = {
            img: getPlatformImage(type),
            x: randomX,
            y: -platformData.height,
            width: platformData.width,
            height: platformData.height,
            type: type,
            speed: getPlatformSpeed() // Set initial speed
        };

        normalPlatforms.push(cn);
    }

    function newFastPlatform() {
        let randomX = Math.floor(Math.random() * (boardWidth - circleRadius * 2));
        let cn = {
            x: randomX,
            y: -circleRadius * 2,
        };

        fastPlatforms.push(cn);
    }

    function getPlatformWithHeight(type) {
        switch (type) {
            case 'bomb':
                return { width: bombWidth, height: bombHeight }; // Fixed size for bombs
            default:
                let wh = Math.floor(Math.random() * (70 - 10 + 1)) + 10;
                return { width: wh, height: wh };
        }
    }

    function getPlatformImage(type) {
        switch (type) {
            case 'bomb':
                return bombImg;
            default:
                return coinImg;
        }
    }
    return (
        <div>
            <div style={{background: '#431D82'}} className='top-0 pb-3 fixed-top text-white'>
                <p className='m-0'>Ride the Unicorn
                    <br/>
                    <small>бот</small>
                </p>
            </div>
            <div style={{position: 'relative', backgroundColor: '#431D82'}}>
                <div style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    width: '100vw', height: '100vh', overflow: 'hidden'
                }}>
                    <canvas
                        ref={canvasRef}
                        width={boardWidth}
                        height={boardHeight}
                    ></canvas>
                    <div style={{
                        position: 'absolute',
                        width: 75,
                        height: 38,
                        left: 25,
                        top: 70,
                        background: '#431D82',
                        border: 1,
                        borderStyle:'solid',
                        borderColor: '#BE37D2',
                        borderRadius: 50,
                    }}>
                        <p className='fs-5 text-warning'>00:{remainingTime >= 10 ? remainingTime : '0' + remainingTime}</p>
                    </div>
                    <div className='fs-5 text-warning p-0' style={{
                        position: 'absolute',
                        top: 70,
                        right: 10,
                        fontSize: '20px',
                        zIndex: 1,
                        background: '#431D82',
                        border: 1,
                        width: 63,
                        borderStyle:'solid',
                        borderColor: '#BE37D2',
                        borderRadius: 50,
                    }}>
                        <img width={20} src={imgCoin} /> <small className='pt-1'>{coins}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnicornBlum;
