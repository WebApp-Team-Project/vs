import styled from 'styled-components';
import '../index.css';
import { useEffect } from 'react';

const PickDiv = styled.div`
  width: 353px;
  height: auto;

  margin-top: 34px;
`;

const PickHeader = styled.div`
  width: 353px;
  height: 18px;
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;

  text-align: center;
  margin-bottom: 8px;

  align-items: center;
`;

const PickChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 18px;
  font-size: 8px;
  border-radius: 50px;
  padding: 2px 10px;
  font-weight: bold;
  background-color: ${({ $voteOptionIndex }) => {
    if ($voteOptionIndex === 0) return 'var(--yellow--color)';
    if ($voteOptionIndex === 1) return 'var(--green--color)';
    if ($voteOptionIndex === 2) return 'var(--orange--color)';
  }};
`;

const PickContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 353px;
  height: auto;
  background-color: #242424;
  border: 1px solid #575757;
  border-radius: 6px;
  padding: 16px 20px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
  }

  p {
    font-size: 12px;
    font-weight: normal;
    color: #fff;
  }
`;

function Pick(props) {
  const { voteOptionIndex, voteOption, content, imageUrl } = props;

  return (
    <PickDiv>
      <PickHeader>
        작성자의 Pick
        <PickChip $voteOptionIndex={voteOptionIndex}>{voteOption}</PickChip>
      </PickHeader>
      <PickContent>
        <img src={imageUrl} alt='review thumbnail' />
        <p>{content}</p>
      </PickContent>
    </PickDiv>
  );
}

export default Pick;
