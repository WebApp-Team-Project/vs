import styled from 'styled-components';
import VoteContainer from '../components/VoteContainer';
import CommentItem from '../components/CommentItem';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

function PostViewPage() {
  return (
    <MainDiv>
      <h1 style={{ color: '#fff' }}>PostView 페이지</h1>
      <VoteContainer></VoteContainer>
      <CommentItem></CommentItem>
    </MainDiv>
  );
}

export default PostViewPage;
