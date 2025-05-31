import styled from 'styled-components';
import { useState, useEffect } from 'react';
import '../index.css';
import Button from './Button';
import dayjs from 'dayjs';
import { getUidFromLocalStorage } from '../libs/user';
import { submitVote } from '../services/votes';
import { motion } from 'framer-motion';
import { isDeadlinePassed } from '../libs/date';
import { getHighestRateIndex } from '../libs/rate';

const VOTE_OPTION_COLOR = [
  'var(--yellow--color)',
  'var(--green--color)',
  'var(--orange--color)',
];

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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $selected, $color, $isAlreadyVoted }) =>
    $selected && !$isAlreadyVoted ? $color : 'var(--gray600--color)'};
  border-radius: 8px;
  padding: 8px 20px;
  cursor: ${({ $disabled }) => ($disabled ? '' : 'pointer')};
  color: var(--font-font_light, #fff);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $selected, $disabled }) =>
      !$selected && !$disabled && 'var(--gray500--color)'};
  }

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  div:nth-child(2) {
    font-size: 0.625rem;
    color: var(--light--font);
  }
`;

const RateBar = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  background-color: ${({ $color }) => $color};
  pointer-events: none;
  z-index: 0;
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
  const {
    authorUid,
    postId,
    voteOptions,
    deadline,
    participants,
    voteOptionIndex,
    setVoteOptionIndex,
    onAfterSubmitVote,
  } = props;

  const [isAlreadyVoted, setIsAlreadyVoted] = useState(false);
  const [voteStats, setVoteStats] = useState([]);

  // 투표 버튼 클릭 핸들러
  const handleSubmitButtonClick = () => {
    const myUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

    submitVote(postId, voteOptionIndex, myUid)
      .then(() => {
        console.log('투표 성공');
        onAfterSubmitVote();
      })
      .catch(error => {
        console.error('투표 중 오류:', error);
      });
  };

  // 각 옵션 별 투표수 및 투표율 계산 함수
  const calculateVoteStats = (voteOptions, participants) => {
    if (!Array.isArray(voteOptions) || !participants) return [];

    const total = Object.keys(participants).length;
    const counts = Array(voteOptions.length).fill(0);

    // 각 옵션 인덱스별로 카운트 증가
    Object.values(participants).forEach(idx => {
      if (typeof idx === 'number' && counts[idx] !== undefined) {
        counts[idx] += 1;
      }
    });

    // 퍼센트 계산
    const rates = counts.map(
      count => (total > 0 ? Math.round((count / total) * 1000) / 10 : 0), // 소수점 1자리
    );

    return voteOptions.map((option, idx) => ({
      option,
      count: counts[idx],
      rate: rates[idx],
    }));
  };

  useEffect(() => {
    const myUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

    // 투표 참여 여부 확인
    if (participants?.[myUid] !== undefined) {
      setVoteOptionIndex(participants?.[myUid]);
      setIsAlreadyVoted(true);
    }

    // 각 옵션 별 투표수 및 투표율 계산
    const voteStats = calculateVoteStats(voteOptions, participants);
    setVoteStats(voteStats);
  }, [participants, setVoteOptionIndex, voteOptions]);

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
        <VoteOption
          key={`${option}-${index}`}
          onClick={() => {
            if (!isAlreadyVoted && !isDeadlinePassed(deadline)) {
              setVoteOptionIndex(index);
            }
          }}
          $selected={voteOptionIndex === index}
          $color={VOTE_OPTION_COLOR[index]}
          $disabled={isAlreadyVoted || isDeadlinePassed(deadline)}
          $isAlreadyVoted={isAlreadyVoted}
          $isDeadlinePassed={isDeadlinePassed(deadline)}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            {isAlreadyVoted &&
              voteOptionIndex === index &&
              !isDeadlinePassed(deadline) && (
                <img src='/images/icon_check.svg' />
              )}
            {isDeadlinePassed(deadline) &&
              getHighestRateIndex(voteStats) === index && (
                <img src='/images/icon_crown.svg' />
              )}
            <span>{option}</span>
          </div>

          {(isAlreadyVoted || isDeadlinePassed(deadline)) && (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p>{voteStats?.[index]?.rate}%</p>
              <p>{`(${voteStats?.[index]?.count}명)`}</p>
            </div>
          )}

          {(isAlreadyVoted || isDeadlinePassed(deadline)) && (
            <RateBar
              $color={VOTE_OPTION_COLOR[index]}
              animate={{ width: `${voteStats?.[index]?.rate || 0}%` }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
        </VoteOption>
      ))}

      {!isAlreadyVoted && !isDeadlinePassed(deadline) && (
        <Button
          type='long'
          title='투표하기'
          onClick={() => {
            if (!isAlreadyVoted) {
              handleSubmitButtonClick();
            }
          }}
        />
      )}

      <Imgspan2>
        <img src='/images/icon_people.svg' />
        <h3>{Object.keys(participants || {}).length.toLocaleString()}</h3>
      </Imgspan2>
    </Container>
  );
}

export default VoteContainer;
