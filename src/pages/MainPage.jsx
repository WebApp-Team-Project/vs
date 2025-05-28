import styled from 'styled-components';
import { useEffect, useState } from 'react';
import '../index.css';

import CategoryBox from '../components/CategoryBox';
import PostList from '../components/PostList';
import HeaderContainer from '../components/HeaderContainer';
import Button from '../components/Button';

import { createPost, fetchPostsByStatusAndCategory } from '../services/posts';
import { Timestamp } from 'firebase/firestore';

const MainDiv = styled.div`
  position: relative;
  width: 393px;
  height: 100%;
  padding: 40px 20px;
  margin: 0 auto;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TodayIssueBoxWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 129px;
  gap: 9px;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
`;

const TodayIssueBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--gray800--color);
  border: 1px solid #414141;
  border-radius: 8px;
  cursor: pointer;
  gap: 6px;

  span {
    font-size: 1rem;
    font-weight: 700;
    color: var(--light--font);
  }

  p {
    font-size: 0.5rem;
    color: var(--gray--font);
  }
`;

const TodayIssueLogo = styled.div`
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
`;

function MainPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsByStatusAndCategory({ status: 'open', category: '전체' })
      .then(result => {
        setPosts(result);
        console.log(result);
      })
      .catch(error => {
        console.error('글 조회 중 오류:', error);
      });
  }, []);

  return (
    <MainDiv>
      <HeaderContainer></HeaderContainer>
      <Wrap>
        <h1 className='h1_title'>Today_issue</h1>
        <TodayIssueBoxWrap>
          <TodayIssueBox>
            <span>6시간 공강</span>
            <p>통학러의 우주공강</p>
          </TodayIssueBox>
          <TodayIssueBox>
            <span>8시간 풀강</span>
            <p>NO 식사시간 무한강의</p>
          </TodayIssueBox>
          {/* <TodayIssueLogo>
            <img src='/images/icon_logo.svg' alt='로고' />
          </TodayIssueLogo> */}
        </TodayIssueBoxWrap>
      </Wrap>

      <Wrap>
        <h1 className='h1_title'>Community</h1>
        <CategoryBox></CategoryBox>
        <PostList posts={posts}></PostList>
      </Wrap>

      <Button type='icon' to='/write'></Button>
    </MainDiv>
  );
}

export default MainPage;
