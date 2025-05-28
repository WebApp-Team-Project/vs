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
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--gray600--color);
  }

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

const ToggleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 79px;
  height: 24px;
  border-radius: 50px;
  background-color: var(--gray500--color);
  padding: 0 8px;
  cursor: pointer;

  span {
    font-size: 0.625rem;
    font-weight: ${({ $status }) => ($status === 'open' ? 'bold' : 'normal')};
    text-align: center;
    z-index: 1;
    transition: all 0.3s ease;
  }

  span:first-child {
    width: 28px;
    color: ${({ $status }) =>
      $status === 'open' ? 'var(--light--font)' : '#d9d9d9'};
  }

  span:nth-child(2) {
    width: 19px;
    color: ${({ $status }) =>
      $status === 'closed' ? 'var(--light--font)' : '#d9d9d9'};
  }
`;

const ToggleChip = styled.div`
  position: absolute;
  width: ${({ $status }) => ($status === 'open' ? '44px' : '35px')};
  height: 24px;
  top: 0;
  border-radius: 50px;
  background-color: var(--main--color);
  transition: all 0.3s ease;

  /* status가 open이면 왼쪽, closed면 오른쪽 */
  left: ${({ $status }) => ($status === 'open' ? '0' : 'calc(100% - 35px)')};
`;

const CATEGORY_LIST = ['전체', '학교', '연애', '음식', '일상'];

const COLOR_THEME = {
  전체: { color: 'var(--blue--color)', border: 'var(--blue--color)' },
  학교: { color: 'var(--green--color)', border: 'var(--green--color)' },
  연애: { color: 'var(--pink--color)', border: 'var(--pink--color)' },
  음식: { color: 'var(--yellow--color)', border: 'var(--yellow--color)' },
  일상: { color: '#8EE060', border: '#8EE060' },
};

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('전체');
  const [status, setStatus] = useState('open');

  useEffect(() => {
    fetchPostsByStatusAndCategory({ status, category })
      .then(result => {
        setPosts(result);
      })
      .catch(error => {
        console.error('글 조회 중 오류:', error);
      });
  }, [category, status]);

  // 토글 버튼 클릭 핸들러
  const handleToggleButtonClick = () => {
    setStatus(status === 'open' ? 'closed' : 'open');
  };

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
        <ToggleContainer>
          <h1 className='h1_title'>Community</h1>
          <ToggleWrapper onClick={handleToggleButtonClick} $status={status}>
            <span>진행중</span>
            <span>마감</span>
            <ToggleChip $status={status}></ToggleChip>
          </ToggleWrapper>
        </ToggleContainer>

        <CategoryBox
          selectedCategory={category}
          setCategory={setCategory}
          categories={CATEGORY_LIST}
          colorThemes={COLOR_THEME}
        />
        <PostList posts={posts} colorThemes={COLOR_THEME}></PostList>
      </Wrap>

      {/* 글 작성 버튼 */}
      <Button type='icon' to='/write' />
    </MainDiv>
  );
}

export default MainPage;
