import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../index.css';

const Container = styled.div`
  background-color: #242424;
  color: var(--light--font);
  border: 0.7px solid #414141;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--gray600--color);
  }
`;

const Topdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;

  h2 {
    font-size: 10px;
    color: ${props => props.color || '#FFFFFF'};
  }
  h3 {
    font-size: 10px;
  }
`;

const Maindiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 13px 0px;
  color: ${({ $status }) =>
    $status === 'open' ? 'var(--light--font)' : '#7d7d7d'};

  h1 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
`;

const Bottomdiv = styled(Topdiv)`
  gap: 6px;
  justify-content: start;

  font-size: 8px;
`;

const Imgspan = styled.span`
  display: flex;
  color: var(--gray--font);
  gap: 4px;

  h3 {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.625rem;
    font-weight: 700;
  }
`;
const Imgspan2 = styled.span`
  display: flex;
  color: var(--gray--font);
  gap: 2px;
  text-align: center;
  align-items: center;

  p {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
  }
`;

const GoToReviewContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 23px;
  width: 100%;
  height: 42px;
  background-color: var(--dark--font);
  gap: 13px;
  cursor: pointer;

  img {
    width: 17px;
    height: 17px;
  }

  span {
    color: var(--main--color);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.75rem;
  }
`;

function PostItem(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${props.id}`);
  };

  const {
    category,
    title,
    content,
    voteCount,
    timelimit,
    commentsCount,
    review,
    colorTheme,
    $status,
  } = props;

  return (
    <Container onClick={handleClick}>
      <ContentContainer>
        <Topdiv>
          <h2 style={{ color: colorTheme.color }}>&lt;{category}&gt;</h2>
          <Imgspan $status={$status}>
            <img src='/images/icon_clock_black.png' width="16px" height="16px"></img>
            <h3>{timelimit}</h3>
          </Imgspan>
        </Topdiv>
        <Maindiv $status={$status}>
          <h1>{title}</h1>
          <p>{content}</p>
        </Maindiv>
        <Bottomdiv>
          <Imgspan2>
            <img src='/images/icon_people_black.png' width="14px" height="14px"></img>
            <p>{voteCount}</p>
          </Imgspan2>
          <Imgspan2>
            <img src='/images/icon_comment.svg'></img>
            <p>{commentsCount}</p>
          </Imgspan2>
        </Bottomdiv>
      </ContentContainer>

      {review && (
        <GoToReviewContainer>
          <img src='/images/icon_arrow.svg'></img>
          <span>작성자 후기보러가기</span>
        </GoToReviewContainer>
      )}
    </Container>
  );
}

export default PostItem;
