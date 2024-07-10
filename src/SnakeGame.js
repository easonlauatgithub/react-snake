import React from 'react';
import styled, { css } from "styled-components";
import Information from "./components/Information";
import MainMap from "./components/MainMap";
import Actions from "./components/Actions";

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
${styleForDemo}
`;

const Container = styled.div`
  margin-top: 40px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const SnakeGmae = () => {
    return(
        <Background>
            <Container>
                <Information />
                <MainMap/>
                <Actions />
            </Container>
        </Background>
    );
};

export default SnakeGmae;