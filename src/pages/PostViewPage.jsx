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



const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const CommentUpload = styled.div`
  display:flex;
  gap: 6px;
`

function PostViewPage() {
  const { id } = useParams(); // postId 가져오기

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Community'></HeaderContainer>
      <Post></Post>
      <VoteContainer></VoteContainer>

      <Button type="long" title="Review Commit" to="/review"></Button>
      
      <Pick></Pick>

      <CommentItem></CommentItem>
      <CommentItemlist postId={id}></CommentItemlist>

      <CommentUpload>
      <TextInput></TextInput>
      <Button type='short' title="Commit"></Button>
      </CommentUpload>
    </MainDiv>
  );
}

export default PostViewPage;
