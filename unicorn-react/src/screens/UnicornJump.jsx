import React, { useEffect, useRef, useState } from 'react';
import background from '../images/gameImag/unicornJump/unicornbg.png';
import unicornRight from '../images/gameImag/unicornJump/unicorn-right.png';
import unicornLeft from '../images/gameImag/unicornJump/unicorn-left.png';
import platform from '../images/gameImag/unicornJump/platform.png';
import coinPlatform from '../images/gameImag/unicornJump/coin.png';
import bomb from '../images/gameImag/unicornJump/bomb.png';
import coin from '../images/icons/coin.svg'
import springPlatform from '../images/gameImag/unicornJump/spring.png';
import {useNavigate} from "react-router-dom";

function UnicornJump() {
    const canvasRef = useRef(null);
    let tickets = localStorage.getItem('tickets')
    let allCoins = localStorage.getItem('coins')
    let navigate = useNavigate()
    //board
    let board;
    let boardWidth = 400;
    let boardHeight = 750;
    let context;

    //unicorn
    let unicornWidth = 46;
    let unicornHeight = 46;
    let unicornX = boardWidth / 2 - unicornWidth / 2;
    let unicornY = boardHeight * 7 / 8 - unicornHeight;
    let unicornRightImg;
    let unicornLeftImg;

    let unicorn = {
        img: null,
        x: unicornX,
        y: unicornY,
        width: unicornWidth,
        height: unicornHeight
    }

    //physics
    let velocityX = 0;
    let velocityY = 0;
    let initialVelocityY = -8;
    let gravity = 0.4;

    //platforms
    let platformArray = [];
    let platformWidth = 60;
    let platformHeight = 18;
    let platformImg;
    let coinImg;
    let bombImg;
    let springImg;

    let score = 0;
    let coins = 0;
    let maxScore = 0;
    let gameOver = false;
    let touchStartX = 0;
    let touchEndX = 0;
    const drawEllipse = (x, y, width, height, blur) => {
        context.clearRect(0, 0, boardWidth, boardHeight);
        context.beginPath();
        context.ellipse(x, y, width / 2, height / 2, 0, 0, 2 * Math.PI);
        context.fillStyle = '#B60000'; // Красный цвет
        context.filter = `blur(${blur}px)`; // Применяем размытие
        context.fill();
        context.filter = 'none'; // Сброс фильтра для остальных операций
    };
    useEffect(() => {
        if (tickets == 0){
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        board = canvasRef.current;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        context = board.getContext('2d');

        unicornRightImg = new Image();
        unicornRightImg.src = unicornRight;
        unicorn.img = unicornRightImg;
        unicornRightImg.onload = function () {
            context.drawImage(unicorn.img, unicorn.x, unicorn.y, unicorn.width, unicorn.height);
        }
        unicornLeftImg = new Image();
        unicornLeftImg.src = unicornLeft;

        platformImg = new Image();
        platformImg.src = platform;

        coinImg = new Image();
        coinImg.src = coinPlatform;

        bombImg = new Image();
        bombImg.src = bomb;

        springImg = new Image();
        springImg.src = springPlatform;

        velocityY = initialVelocityY;
        placePlatforms();
        requestAnimationFrame(update);

        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        }
    }, [unicorn]);

    function handleClick() {
        if (gameOver) {
            resetGame();
        }
    }

    function handleKeyDown(e) {
        if (e.code === 'ArrowRight' || e.code === 'KeyD') {
            velocityX = 4; // Increased for faster horizontal movement
            unicorn.img = unicornRightImg;
        } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
            velocityX = -4; // Increased for faster horizontal movement
            unicorn.img = unicornLeftImg;
        } else if (e.code === 'Space' && gameOver) {
            resetGame();
        }
    }

    function handleTouchStart(e) {
        if (gameOver) return;
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (gameOver) return;
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX < window.innerWidth / 2) {
            // swipe left
            velocityX = -4; // Increased for faster horizontal movement
            unicorn.img = unicornLeftImg;
        } else if (touchStartX > window.innerWidth / 2) {
            // swipe right
            velocityX = 4; // Increased for faster horizontal movement
            unicorn.img = unicornRightImg;
        }
    }
    function update() {
        requestAnimationFrame(update);
        if (gameOver) {
            return;
        }
        context.clearRect(0, 0, boardWidth, boardHeight);


        unicorn.x += velocityX;
        if (unicorn.x > boardWidth) {
            unicorn.x = 0;
        } else if (unicorn.x + unicornWidth < 0) {
            unicorn.x = boardWidth;
        }
        velocityY += gravity;
        unicorn.y += velocityY;

        if (unicorn.y < boardHeight / 3) {

            for (let i = 0; i < platformArray.length; i++) {
                let platform = platformArray[i];
                platform.y += Math.abs(velocityY);
            }
            maxScore += Math.floor(50 * Math.random());
        }

        if (unicorn.y > boardHeight) {
            gameOver = true;
            let newTickets = +tickets - 1
            let newCoins = +allCoins + coins
            localStorage.setItem('tickets', newTickets)
            localStorage.setItem('coins', newCoins)
        }

        context.drawImage(unicorn.img, unicorn.x, unicorn.y, unicorn.width, unicorn.height);


        for (let i = 0; i < platformArray.length; i++) {
            let platform = platformArray[i];
            if (velocityY < 0 && unicorn.y < boardHeight * 3 / 4) {
                platform.y -= initialVelocityY;
            }
            if (detectCollision(unicorn, platform) && velocityY >= 0) {
                if (platform.type === 'spring') {
                    velocityY = initialVelocityY * 1.5;
                } else {
                    velocityY = initialVelocityY;
                }
                if (platform.type === 'coin') {
                    coins += 1;
                    platform.img = platformImg;
                    platform.type = 'normal';
                    platform.width = platformWidth
                    platform.height = platformHeight
                    // setCoin(+coin+1)
                }
                if (platform.type === 'bomb') {
                    gameOver = true;
                    let newTickets = +tickets - 1
                    let newCoins = +allCoins + coins
                    localStorage.setItem('tickets', newTickets)
                    console.log(newCoins)
                    localStorage.setItem('coins', newCoins)
                }
            }
            context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
        }


        while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
            platformArray.shift();
            newPlatform();
        }

        // updateScore();
        context.fillStyle = 'black';
        context.font = '16px sans-serif';
        context.fillText(coins, 5, 20);

        if (gameOver) {
            drawEllipse(boardWidth/2, boardHeight/2, boardWidth, boardHeight, 90.5);
            // context.fillText("game over: press 'space' to restart", boardWidth / 7, boardHeight * 7 / 8);
        }
    }
    function resetGame() {
        unicorn = {
            img: unicornRightImg,
            x: unicornX,
            y: unicornY,
            width: unicornWidth,
            height: unicornHeight
        };
        velocityX = 0; // Reset horizontal velocity
        velocityY = initialVelocityY; // Reset vertical velocity
        coins = 0;
        maxScore = 0;
        gameOver = false;
        placePlatforms();
    }

    function placePlatforms() {
        platformArray = [];

        let platform = {
            img: platformImg,
            x: boardWidth / 2,
            y: boardHeight - 50,
            width: platformWidth,
            height: platformHeight,
            type: 'normal'
        };

        platformArray.push(platform);

        for (let i = 0; i < 6; i++) {
            let randomX = Math.floor(Math.random() * boardWidth * 3 / 4);
            let type = getRandomPlatformType();
            let platformData = getPlatformWithHeight(type)
            platform = {
                img: getPlatformImage(type),
                x: randomX,
                y: boardHeight - 75 * i - 150,
                width: platformData.width,
                height: platformData.height,
                type: type
            };

            platformArray.push(platform);
        }
    }

    function newPlatform() {
        let randomX = Math.floor(Math.random() * boardWidth * 3 / 4);
        let type = getRandomPlatformType();
        let platformData = getPlatformWithHeight(type)
        platform = {
            img: getPlatformImage(type),
            x: randomX,
            y: -platformHeight,
            width: platformData.width,
            height: platformData.height,
            type: type
        };

        platformArray.push(platform);
    }


    function getRandomPlatformType() {
        const types =['normal', 'coin', 'coin', 'normal', 'normal', 'spring']
        return types[Math.floor(Math.random() * types.length)];
    }

    function getPlatformWithHeight(type) {
        switch (type) {
            case 'coin':
                return { width: platformWidth, height: 40 };
            case 'bomb':
                return { width: 40, height: 40 };
            case 'spring':
                return { width: platformWidth, height: 35 };
            default:
                return { width: platformWidth, height: platformHeight };
        }
    }
    function getPlatformImage(type) {
        switch (type) {
            case 'coin':
                return coinImg;
            case 'bomb':
                return bombImg;
            case 'spring':
                return springImg;
            default:
                return platformImg;
        }
    }

    function detectCollision(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    function updateScore() {
        let points = Math.floor(50 * Math.random());
        if (velocityY < 0) {
            maxScore += points;
            if (score < maxScore) {
                score = maxScore;
            }
        } else if (velocityY >= 0) {
            maxScore -= points;
        }
    }

    return <canvas style={{ backgroundImage: `url(` + background + `)` }} ref={canvasRef} width={boardWidth} height={boardHeight}></canvas>;
}

export default UnicornJump;
