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
import { useEffect, useState } from 'react';
import { addComment, fetchComments } from '../services/comments';
import { fetchPostDetailByPostId } from '../services/posts';
import { getUidFromLocalStorage } from '../libs/user';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const CommentCount = styled.div`
  font-size: 0.5rem;
  font-weight: 700;
  font-family: 'IBM Plex Sans', sans-serif;
  color: #7d7d7d;
  margin-bottom: 10px;
  margin-left: 30px;
`;

const CommentUpload = styled.div`
  display: flex;
  gap: 6px;
`;

function PostViewPage() {
  const { id } = useParams(); // postId 가져오기

  const [post, setPost] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  const myUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

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

  // 댓글 작성 버튼 클릭 핸들러
  const handleCommitButtonClick = () => {
    addComment(id, commentInput, myUid)
      .then(() => {
        setCommentInput('');
      })
      .catch(error => {
        console.error('댓글 작성 중 오류:', error);
      });
  };

  // 댓글 입력값 변경 핸들러
  const handleCommentInputChange = e => {
    setCommentInput(e.target.value);
  };

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Community'></HeaderContainer>
      <Post
        title={post?.title}
        content={post?.content}
        timestamp={post?.createdAt}
      ></Post>
      <VoteContainer
        authorUid={post?.vote?.authorUid}
        voteOptions={post?.vote?.options}
        deadline={post?.vote?.deadline}
        participantsCount={post?.vote?.participantsCount}
      ></VoteContainer>

      {/* 작성자일 경우만 리뷰 달기 버튼 보임 */}
      {post?.authorUid === myUid && (
        <div style={{ margin: '28px 0px', width: '100%' }}>
          <Button type='long' title='Review Commit' to='/review'></Button>
        </div>
      )}

      {/* 후기 보여주기 */}
      {post?.review && <Pick></Pick>}

      <CommentCount>Comment {post?.commentsCount}</CommentCount>
      <CommentItemlist postId={id} comments={comments}></CommentItemlist>

      <CommentUpload>
        <TextInput onChange={handleCommentInputChange}></TextInput>
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
