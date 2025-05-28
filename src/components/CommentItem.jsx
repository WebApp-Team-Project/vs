import styled from 'styled-components';
import { useState, useEffect } from 'react';
import '../index.css';
import dayjs from 'dayjs';

const CommentItemContainer = styled.div`
  width: 100%;
  padding: 12px 30px;

  border-bottom: 0.5px solid #505050;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
`;

const UserName = styled.h1`
  font-size: 11px;
  font-weight: 700;
  color: ${props => props.voteOptionId || '#FFFFFF'};
`;

const IconBox = styled.div`
  display: flex;
  gap: 2px;

  p {
    font-size: 10px;
    color: var(--gray--font);
    font-weight: 700;
  }
`;

const Content = styled.p`
  font-size: 11px;
  color: var(--light--font);
  font-family: 'IBM Plex Sans';
  font-weight: 400;
`;

const TimeStamp = styled.p`
  font-size: 6px;
  font-weight: 400;
  color: var(--gray--font);
`;

function CommentItem(props) {
  const { userId, content, timestamp, likes, voteOptionId, index } = props;

  // timestamp를 Date 객체로 변환
  const date = timestamp?.toDate
    ? timestamp.toDate()
    : timestamp
      ? new Date(timestamp)
      : null;
  const dateStr = date ? dayjs(date).format('MM/DD') : ''; // 날짜
  const timeStr = date ? dayjs(date).format('HH:mm') : ''; // 시간

  return (
    <CommentItemContainer>
      <Container>
        <div>
          <UserName>{`{ 익명${index + 1} }`}</UserName>
          <IconBox>
            <img src='/images/icon_like.svg' />
            <p>{likes || '0'}</p>
          </IconBox>
        </div>
        <Content>{content || '댓글 내용입니다.'}</Content>
        <div>
          <TimeStamp>
            {dateStr} {timeStr}
          </TimeStamp>
        </div>
      </Container>
    </CommentItemContainer>
  );
}

export default CommentItem;
