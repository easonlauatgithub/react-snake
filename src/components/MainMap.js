import styled, { css } from "styled-components";
import {
    PAGE_PADDING, MAX_CONTENT_WIDTH, GRID_SIZE
} from '../constants';

//css
const mapSize = css`
  width: min(calc(100vw - ${PAGE_PADDING * 2}px), ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px);
  height: min(calc(100vw - ${PAGE_PADDING * 2}px), ${MAX_CONTENT_WIDTH - (PAGE_PADDING * 2)}px);
`;

const GridContainer = styled.div`
  ${mapSize}
  display: grid;
  grid-template-columns: repeat(${GRID_SIZE}, 1fr);
  grid-template-rows: repeat(${GRID_SIZE}, 1fr);
  grid-gap: 2px;
`;

const Square = styled.div`
  background-color: ${(props) => (props.$isSnake ? '#FFF' : '#161616')};
`;

const MainMap = ({
  snake
}) => {
  const { head, bodyList } = snake;
  const squares = Array(GRID_SIZE).fill(0).map((_, index) => index);
  return (
      <GridContainer>{
          squares.map((row) => squares.map((column)=>{
            //destruct bodyList, then attach to head
            const isSnake = [head, ...bodyList].find((item)=> item.x === column && item.y === row);
            return (
              <Square
              key={`${row}_${column}`}
              data-x={column}
              data-y={row}
              $isSnake={isSnake}
              />
            );
          }
          ))
      }</ GridContainer>
  );
};

export default MainMap;