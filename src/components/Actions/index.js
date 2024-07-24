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

const Actions = ({ handleTogglePause, handleChangeDirection }) => (
  <ActionsContainer>
    <VirtualKeyboard
    handleChangeDirection={handleChangeDirection}
    />
    <PauseButton 
    onClick={handleTogglePause} 
    />
  </ActionsContainer>
);

export default Actions;