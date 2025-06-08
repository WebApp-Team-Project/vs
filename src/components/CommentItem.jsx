import styled from 'styled-components';
import '../index.css';
import dayjs from 'dayjs';
import { fetchCommentLikes, likeComment } from '../services/comments';
import { getUidFromLocalStorage } from '../libs/user';
import { useEffect, useState } from 'react';

const CommentItemContainer = styled.div`
  width: 100%;
  padding: 10px 20px;

  border-bottom: 0.5px solid #505050;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
`;

const UserName = styled.h1`
  font-size: 11px;
  font-weight: 700;
  color: ${({ $voteOptionColor }) => $voteOptionColor};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 18px;
  border: 1px solid #383838;
  border-radius: 3px;
  gap: 2px;
  cursor: pointer;

  img {
    width: 10px;
    height: 10px;
    transition: transform 0.3s ease;
  }

  p {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    color: ${({ $isLiked }) =>
      $isLiked ? 'var(--main--color)' : 'var(--gray--font)'};
    font-weight: 700;
    transition: color 0.3s ease;
  }
`;

const Content = styled.p`
  font-size: 11px;
  color: var(--light--font);
  font-family: 'IBM Plex Sans';
  font-weight: 400;
`;

const TimeStamp = styled.p`
  font-size: 8px;
  font-weight: 400;
  color: var(--gray--font);
`;

function CommentItem(props) {
  const {
    id,
    postId,
    userId,
    content,
    timestamp,
    likes,
    index,
    onAfterAddOrLikeComment,
    voteParticipants,
  } = props;

  const [voteOptionColor, setVoteOptionColor] = useState('#FFFFFF');
  const [isLiked, setIsLiked] = useState(false);

  // timestamp를 Date 객체로 변환
  const date = timestamp?.toDate
    ? timestamp.toDate()
    : timestamp
      ? new Date(timestamp)
      : null;
  const dateStr = date ? dayjs(date).format('MM/DD') : ''; // 날짜
  const timeStr = date ? dayjs(date).format('HH:mm') : ''; // 시간

  // 좋아요 클릭 핸들러
  const handleLikeButtonClick = () => {
    const myUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

    likeComment(postId, id, myUid)
      .then(res => {
        if (res) {
          console.log('좋아요 성공');
          onAfterAddOrLikeComment(true);
        } else {
          console.log('이미 좋아요를 눌렀습니다.');
        }
      })
      .catch(error => {
        console.error('좋아요 실패:', error);
      });
  };

  useEffect(() => {
    if (!userId) return;

    let voteOptionColor = '#FFFFFF';

    if (voteParticipants?.[userId] === 0) {
      voteOptionColor = '#eeba4e';
    } else if (voteParticipants?.[userId] === 1) {
      voteOptionColor = '#6dc53c';
    } else if (voteParticipants?.[userId] === 2) {
      voteOptionColor = '#f37b4a';
    }

    setVoteOptionColor(voteOptionColor);
  }, [voteParticipants, userId]);

  useEffect(() => {
    const myUid = getUidFromLocalStorage();

    // 댓글 좋아요 조회 API 호출
    fetchCommentLikes(postId, id)
      .then(res => {
        console.log('댓글 좋아요', res);

        // 좋아요 여부 확인
        const isLiked = res.find(like => like.id === myUid) !== undefined;
        setIsLiked(isLiked);
      })
      .catch(error => {
        console.error('댓글 좋아요 조회 중 오류:', error);
      });
  }, [postId, id, likes]);

  return (
    <CommentItemContainer>
      <Container>
        <div>
          <UserName
            $voteOptionColor={voteOptionColor}
          >{`{ 익명${index + 1} }`}</UserName>
          <IconBox onClick={handleLikeButtonClick} $isLiked={isLiked}>
            {isLiked ? (
              <img src='/images/icon_like_blue.svg' />
            ) : (
              <img src='/images/icon_like.svg' />
            )}
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
