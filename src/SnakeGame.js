import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from "styled-components";
import Information from "./components/Information";
import MainMap from "./components/MainMap";
import Actions from "./components/Actions";
import {
    GRID_SIZE, SNAKE_INITIAL_SPEED, SPACE, SNAKE_DELTA_SPEED, SNAKE_LIMITED_SPEED,
    ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, 
} from './constants';

// css
const styleForDemo = css`
    * {
        border: 1px solid black;
        padding: 4px;
        margin: 4px;
    }
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  background: #000;
/*
${styleForDemo}
   */
`;

const Container = styled.div`
  margin-top: 40px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

//data
const directionMap = {
    [ARROW_UP]: { x: 0, y: -1 },
    [ARROW_DOWN]: { x: 0, y: 1 },
    [ARROW_LEFT]: { x: -1, y: 0 },
    [ARROW_RIGHT]: { x: 1, y: 0 },
};

const defaultSnake = {
    head: { x: 6, y: 0 },
    bodyList: [
      { x: 5, y: 0 },
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
    maxLength: 7,
    direction: ARROW_RIGHT,
    speed: SNAKE_INITIAL_SPEED,
};

// function 
const formatPosition = (position) => {
  if (position > (GRID_SIZE - 1)) {
      return 0;
  }
  if (position < 0) {
      return GRID_SIZE - 1;
  }
  return position;
};

const createFood = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const SnakeGmae = () => {
    const [snake, setSnake] = useState(defaultSnake);
    const [food, setFood] = useState(() => createFood());
    const [score, setScore] = useState(0); 
    const [isGameStart, setIsGameStart] = useState(true);
    const [isPause, setIsPause] = useState(false);
    const eatFood = snake.head.x === food.x && snake.head.y === food.y;
    const gameOver = snake.bodyList.find((item)=> {
      return item.x === snake.head.x && item.y === snake.head.y
    }); 

    //start, restart game
    const handleOnGameStart = () => {
      setScore(0);
      setSnake(defaultSnake);
      setIsGameStart(true);
      if (gameOver) {
        setFood(createFood());
      }
    };
    
    //pause game
    const handleTogglePause = () => {
      if (isGameStart) {
        setIsPause((prev) => !prev);
      }
      console.log("isPause"+isPause);
    };

    // handle key pressed 2
    const handleKeydown = useCallback((event) => {
      const { code } = event;
      console.log("event code: "+code);
      console.log(event);
      if (code === SPACE) {
        handleTogglePause();
        return;
      }
      handleChangeDirection(code);
    }, [snake]);    

    const handleChangeDirection = (directionKey) => {
      if (directionKey === ARROW_UP && snake.direction !== ARROW_DOWN) {
        setSnake((prevSnake) => ({
          ...prevSnake,
          direction: ARROW_UP,
        }));
      }
      if (directionKey === ARROW_DOWN && snake.direction !== ARROW_UP) {
        setSnake((prevSnake) => ({
          ...prevSnake,
          direction: ARROW_DOWN,
        }));
      }
      if (directionKey === ARROW_LEFT && snake.direction !== ARROW_RIGHT) {
        setSnake((prevSnake) => ({
          ...prevSnake,
          direction: ARROW_LEFT,
        }));
      }
      if (directionKey === ARROW_RIGHT && snake.direction !== ARROW_LEFT) {
        setSnake((prevSnake) => ({
          ...prevSnake,
          direction: ARROW_RIGHT,
        }));
      }
    };

    // handle key pressed 1
    useEffect(() => {
      window.addEventListener('keydown', handleKeydown);
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }, [handleKeydown]);
    
    // move snake head, body every interval
    useEffect(() => {
      const gameIntervalId = setInterval(() => {
        if (!isGameStart || isPause) {
          return;
        }
        setSnake((prevSnake) => {
          const updatedX = formatPosition(prevSnake.head.x + directionMap[prevSnake.direction].x);
          const updatedY = formatPosition(prevSnake.head.y + directionMap[prevSnake.direction].y);
          const newBodyList = [
            prevSnake.head,
            ...prevSnake.bodyList.slice(0, prevSnake.maxLength - 2),
          ];
          return ({
            ...prevSnake,
            head: {
              x: updatedX,
              y: updatedY,
            },
            bodyList: newBodyList,
          });
        });
      }, snake.speed);
      return () => {
        clearInterval(gameIntervalId);
      };
    }, [snake.speed, isGameStart, isPause]);

    // check if snake eat food
    useEffect(() => {
      if (eatFood) {
        setFood(createFood());
        setScore((prevScore) => prevScore + 1);
        setSnake((prevSnake) => {
          const updatedSpeed = prevSnake.speed - SNAKE_DELTA_SPEED;
          return ({
            ...prevSnake,
            maxLength: prevSnake.maxLength + 1,
            speed: Math.max(updatedSpeed, SNAKE_LIMITED_SPEED),
          });
        });
      }
    }, [eatFood]);

    //when snake head hit body, gameOver is true, then, set isGameStart to false, to stop the game
    useEffect(() => {
      if (gameOver) {
        setIsGameStart(false);
      }
    }, [gameOver]);
    
    return(
        <Background>
            <Container>
                <Information score={score}/>
                <MainMap 
                  snake={snake} 
                  food={food} 
                  gameOver={gameOver}
                  isGameStart={isGameStart}
                  handleOnGameStart={handleOnGameStart}
                />
                <Actions 
                  isPause={isPause}
                  handleTogglePause={handleTogglePause}
                  handleChangeDirection={handleChangeDirection}
                />
            </Container>
        </Background>
    );
};

export default SnakeGmae;