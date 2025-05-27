import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import VoteContainer from '../components/VoteContainer';
import CommentItem from '../components/CommentItem';
import CommentItemlist from '../components/CommentItemList';
import HeaderContainer from '../components/HeaderContainer';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

function PostViewPage() {
  const { id } = useParams(); // postId 가져오기

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Community'></HeaderContainer>
      <VoteContainer></VoteContainer>
      <CommentItem></CommentItem>
      <CommentItemlist postId={id}></CommentItemlist>
    </MainDiv>
  );
}

export default PostViewPage;
