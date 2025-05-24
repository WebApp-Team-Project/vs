import styled from 'styled-components';
import { useState, useEffect } from 'react';
import '../index.css';

const CommentItemContainer = styled.div`
  width: 393px;
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
  font-weight: bold;
`;

const IconBox = styled.div`
  display: flex;
  gap: 2px;

  p {
    font-size: 10px;
    font-weight: bold;
  }
`;

const Content = styled.p`
  font-size: 11px;
`;

const TimeStamp = styled.p`
  font-size: 6px;
`;

function CommentItem(props) {
  const { userId, content, timestamp, likes, voteOptionId } = props;

  return (
    <CommentItemContainer>
      <Container>
        <div>
          <UserName>&lt;{userId || '익명1'}&gt;</UserName>
          <IconBox>
            <img src='따봉아이콘' />
            <p>{likes || '0'}</p>
          </IconBox>
        </div>
        <Content>{content || '댓글 내용입니다.'}</Content>
        <div>
          <TimeStamp>{timestamp || '5/23 17:54'}</TimeStamp>
        </div>
      </Container>
    </CommentItemContainer>
  );
}

export default CommentItem;
