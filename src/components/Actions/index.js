/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import PauseButton from './PauseButton';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Actions = ({ handleTogglePause }) => (
  <ActionsContainer>
    <div className="virtual-keyboard">虛擬方向鍵</div>
    <PauseButton 
    onClick={handleTogglePause} 
    />
  </ActionsContainer>
);

export default Actions;