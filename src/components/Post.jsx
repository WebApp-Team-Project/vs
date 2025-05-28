import styled from 'styled-components';
import { useState, useEffect } from 'react';

import '../index.css';
import dayjs from 'dayjs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;

  margin-top: 23px;
  margin-bottom: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  h1 {
    color: var(--light--font);
    font-size: 14px;
    font-weight: 700;
  }

  span {
    display: flex;
    gap: 5px;
  }

  p {
    color: var(--gray--font);
    font-size: 10px;
    font-weight: 700;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--light--font);

  h1 {
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-size: 14px;
    font-weight: 400;
  }
`;

function Post(props) {
  const { title, content, timestamp } = props;

  // timestamp를 Date 객체로 변환
  const date = timestamp?.toDate
    ? timestamp.toDate()
    : timestamp
      ? new Date(timestamp)
      : null;
  const dateStr = date ? dayjs(date).format('MM/DD') : ''; // 날짜
  const timeStr = date ? dayjs(date).format('HH:mm') : ''; // 시간

  return (
    <Container>
      <UserInfo>
        <img src='/images/icon_profile_gray.svg' />
        <div>
          <h1>익명</h1>
          <span>
            <p>{dateStr}</p>
            <p>{timeStr}</p>
          </span>
        </div>
      </UserInfo>

      <Wrap>
        <h1> {title} </h1>
        <p>{content}</p>
      </Wrap>
    </Container>
  );
}

export default Post;
