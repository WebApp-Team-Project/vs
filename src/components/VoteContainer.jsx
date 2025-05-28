import styled from 'styled-components';
import { useState, useEffect } from 'react';
import '../index.css';
import Button from './Button';
import dayjs from 'dayjs';
import { getUidFromLocalStorage } from '../libs/user';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  background-color: var(--gray800--color);
  border: 1px solid var(--outline--color);
`;

const VoteOption = styled.div`
  padding: 8px 20px;
  background-color: var(--gray600--color);
  border-radius: 8px;
  cursor: pointer;
  color: var(--font-font_light, #fff);
  font-family: 'IBM Plex Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:hover {
    background-color: ${props => props.color || '#FFFFFF'};
  }
`;

const FlexBox = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 12px;
  }

  h2 {
    font-size: 10px;
  }
`;

const Imgspan = styled.span`
  color: var(--light--font);

  display: flex;
  align-items: center;
  gap: 4px;

  h1 {
    font-family: 'IBM Plex Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  h2 {
    font-family: 'IBM Plex Sans';
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Imgspan2 = styled.span`
  color: var(--light--font);

  display: flex;
  align-items: center;
  gap: 2.5px;

  h3 {
    color: var(--gray2, #7d7d7d);
    font-family: 'IBM Plex Sans';
    font-size: 6.4px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

function VoteContainer(props) {
  const { authorUid, voteOptions, deadline, participantsCount } = props;

  const myUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

  useEffect(() => {}, [myUid]);

  return (
    <Container>
      <FlexBox>
        <Imgspan>
          <img src='/images/icon_vote.svg' />
          <h1>투표</h1>
        </Imgspan>
        <Imgspan>
          <img src='/images/icon_clock.png' />
          <h2>
            {deadline && dayjs(deadline.toDate()).diff(dayjs(), 'hour') > 0
              ? `${dayjs(deadline.toDate()).diff(dayjs(), 'hour')}시간`
              : '마감됨'}
          </h2>
        </Imgspan>
      </FlexBox>

      {voteOptions?.map((option, index) => (
        <VoteOption key={`${option}-${index}`}>{option}</VoteOption>
      ))}

      <Button type='long' title='투표하기'></Button>

      <Imgspan2>
        <img src='/images/icon_people.svg' />
        <h3>{participantsCount}</h3>
      </Imgspan2>
    </Container>
  );
}

export default VoteContainer;
