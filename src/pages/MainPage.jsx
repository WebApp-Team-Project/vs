import styled from 'styled-components';
import '../index.css';

import CategoryBox from '../components/CategoryBox';
import PostList from '../components/PostList';
import HeaderContainer from '../components/HeaderContainer';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap:16px;
`

function MainPage() {
  return (
    <MainDiv>
      <HeaderContainer></HeaderContainer>
      <h1 className='h1_title'>Today_issue</h1>

      <Wrap>
        <h1 className='h1_title'>Community</h1>
        <CategoryBox></CategoryBox>
        <PostList></PostList>
      </Wrap>
    </MainDiv>
  );
}

export default MainPage;
