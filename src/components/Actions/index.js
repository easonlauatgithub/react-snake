/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import PauseButton from './PauseButton';
import VirtualKeyboard from './VirtualKeyboard';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Actions = ({ isPause, handleTogglePause, handleChangeDirection }) => (
  <ActionsContainer>
    <VirtualKeyboard
    handleChangeDirection={handleChangeDirection}
    />
    <PauseButton 
    isPause = {isPause}
    onClick={handleTogglePause} 
    />
  </ActionsContainer>
);

export default Actions;