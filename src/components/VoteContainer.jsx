import styled from "styled-components";
import { useState, useEffect } from 'react';
import '../index.css'
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  background-color: var(--gray600--color);
  border: 1px solid var(--gray200--color);
`;

const VoteOption = styled.div`
  padding: 10px;
  background-color: var(--gray500--color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #ddd;
  }
`;

const FlexBox =styled.span`
    display:flex;

    h1{
    font-size: 12px;
    }

    h2{
    font-size: 10px;}
`

function VoteContainer(props){

    return(
        <Container>
            <FlexBox>
                <FlexBox>
                    <img></img>
                    <h1>투표</h1>
                </FlexBox>
                <FlexBox>
                    <img alt="img"></img>
                    <h2>3시간 남음</h2>
                </FlexBox>
            </FlexBox>

            <VoteOption>트랩</VoteOption>
            <VoteOption>니뽕내뽕</VoteOption>

            <Button title="투표하기"></Button>

            <FlexBox>
                    <img></img>
                    <h1>3,000</h1>
                </FlexBox>

        </Container>
    )
}

export default VoteContainer;