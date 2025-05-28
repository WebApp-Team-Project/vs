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

  h1 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
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
  gap: 1px;

  p {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.5rem;
    font-weight: 700;
  }
`;

function PostItem(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${props.id}`);
  };

  const { category, title, content, voteCount, timelimit, commentsCount } =
    props;

  return (
    <Container onClick={handleClick}>
      <Topdiv>
        <h2>&lt;{category}&gt;</h2>
        <Imgspan>
          <img src='/images/icon_clock.png'></img>
          <h3>{timelimit}</h3>
        </Imgspan>
      </Topdiv>
      <Maindiv>
        <h1>{title}</h1>
        <p>{content}</p>
      </Maindiv>
      <Bottomdiv>
        <Imgspan2>
          <img src='/images/icon_people.svg'></img>
          <p>{voteCount}</p>
        </Imgspan2>
        <Imgspan2>
          <img src='/images/icon_comment.svg'></img>
          <p>{commentsCount}</p>
        </Imgspan2>
      </Bottomdiv>
    </Container>
  );
}

export default PostItem;
