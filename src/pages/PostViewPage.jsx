import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import HeaderContainer from '../components/HeaderContainer';

import Post from '../components/Post';
import VoteContainer from '../components/VoteContainer';
import CommentItem from '../components/CommentItem';
import CommentItemlist from '../components/CommentItemList';
import Pick from '../components/Pick';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useEffect, useRef, useState } from 'react';
import {
  addComment,
  fetchCommentLikes,
  fetchComments,
} from '../services/comments';
import { fetchPostDetailByPostId } from '../services/posts';
import { getUidFromLocalStorage } from '../libs/user';
import dayjs from 'dayjs';

const MainDiv = styled.div`
  position: relative;
  width: 393px;
  height: calc(100vh - 72px);
  padding: 40px 20px 0 20px;
  margin: 0 auto;
  overflow-y: scroll;
`;

const CommentCount = styled.div`
  font-size: 0.5rem;
  font-weight: 700;
  font-family: 'IBM Plex Sans', sans-serif;
  color: #7d7d7d;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-top: 34px;
  border-bottom: 1px solid var(--gray200--color);
`;

const CommentUpload = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 353px;
  height: 72px;
  gap: 6px;
`;

function PostViewPage() {
  const { id } = useParams(); // postId 가져오기

  const [post, setPost] = useState(null);
  const [voteOptionIndex, setVoteOptionIndex] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  const commentListEndRef = useRef(null);

  const myUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

  // 댓글 작성 버튼 클릭 핸들러
  const handleCommitButtonClick = () => {
    addComment(id, commentInput, myUid)
      .then(() => {
        setCommentInput('');
        console.log('댓글 작성 성공');
        onAfterAddOrLikeComment();
      })
      .catch(error => {
        console.error('댓글 작성 중 오류:', error);
      });
  };

  // 댓글 입력값 변경 핸들러
  const handleCommentInputChange = e => {
    setCommentInput(e.target.value);
  };

  // 엔터키 입력 핸들러
  const handleCommitButtonKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommitButtonClick();
    }
  };

  // 투표 완료 시 게시글 재조회
  const onAfterSubmitVote = () => {
    fetchPostDetailByPostId(id)
      .then(result => {
        setPost(result);
        console.log('포스트', result);
      })
      .catch(error => {
        console.error('게시글 조회 중 오류:', error);
      });
  };

  // 댓글 작성 후 댓글 재조회
  const onAfterAddOrLikeComment = isLike => {
    fetchComments(id)
      .then(res => {
        setComments(res);
        if (!isLike) {
          setTimeout(() => {
            commentListEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
        console.log('댓글', res);
      })
      .catch(error => {
        console.error('댓글 조회 중 오류:', error);
      });
  };

  // 마감일 지났는지 확인
  function isDeadlinePassed(deadline) {
    if (!deadline?.toDate) return false;
    return dayjs(deadline.toDate()).isBefore(dayjs());
  }

  // postId로 게시글 및 댓글 조회
  useEffect(() => {
    fetchPostDetailByPostId(id)
      .then(result => {
        setPost(result);
        console.log('포스트', result);
      })
      .catch(error => {
        console.error('게시글 조회 중 오류:', error);
      });

    // postId로 댓글 조회
    fetchComments(id)
      .then(result => {
        setComments(result);
        console.log('댓글', result);
      })
      .catch(error => {
        console.error('댓글 조회 중 오류:', error);
      });
  }, [id]);

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Community'></HeaderContainer>
      <Post
        title={post?.title}
        content={post?.content}
        timestamp={post?.createdAt}
      />
      <VoteContainer
        authorUid={post?.vote?.authorUid}
        postId={post?.id}
        voteOptions={post?.vote?.options}
        deadline={post?.vote?.deadline}
        participants={post?.vote?.participants}
        voteOptionIndex={voteOptionIndex}
        setVoteOptionIndex={setVoteOptionIndex}
        onAfterSubmitVote={onAfterSubmitVote}
      />

      {/* 작성자일 경우 및 마감되었을때만 후기 달기 버튼 보임 */}
      {post?.authorUid === myUid && isDeadlinePassed(post?.vote?.deadline) && (
        <div style={{ margin: '28px 0px', width: '100%' }}>
          <Button type='long' title='Review Commit' to='/review'></Button>
        </div>
      )}

      {/* 후기 보여주기 */}
      {post?.review && <Pick></Pick>}

      <CommentCount>Comment {comments.length}</CommentCount>
      <CommentItemlist
        postId={id}
        comments={comments}
        onAfterAddOrLikeComment={onAfterAddOrLikeComment}
      ></CommentItemlist>
      <div ref={commentListEndRef}></div>

      <CommentUpload>
        <TextInput
          type='input'
          text='댓글을 작성해주세요!'
          value={commentInput}
          onChange={handleCommentInputChange}
          onKeyPress={handleCommitButtonKeyDown}
        ></TextInput>
        <Button
          type='short'
          title='Commit'
          onClick={handleCommitButtonClick}
        ></Button>
      </CommentUpload>
    </MainDiv>
  );
}

export default PostViewPage;
