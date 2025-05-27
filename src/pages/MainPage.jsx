import styled from 'styled-components';
import '../index.css';

import CategoryBox from '../components/CategoryBox';
import PostList from '../components/PostList';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const Header = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
`

const HeaderIcon = styled.div`
display: inline-flex;
align-items: center;
gap:14px;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap:16px;
`

function MainPage() {
  return (
    <MainDiv>
      <Header>
        <div>
          <img/>
        </div>
        <HeaderIcon>
          <img src='/images/icon_search.svg' />
          <img src='/images/icon_alert.svg' />
          <img src='/images/icon_profile.svg' />
        </HeaderIcon>
      </Header>
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
