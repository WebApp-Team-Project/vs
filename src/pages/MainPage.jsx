import styled from 'styled-components';
import { useEffect, useState } from 'react';
import '../index.css';

import CategoryBox from '../components/CategoryBox';
import PostList from '../components/PostList';
import HeaderContainer from '../components/HeaderContainer';
import Button from '../components/Button';

import { fetchPostsByStatusAndCategory } from '../services/posts';

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const result = await fetchPostsByStatusAndCategory({
        status: 'open',
        category: '전체',
      });
      setPosts(result);
    };
    loadPosts();
  }, []);

  return (
    <MainDiv>
      <HeaderContainer></HeaderContainer>
      <h1 className='h1_title'>Today_issue</h1>

      <Wrap>
        <h1 className='h1_title'>Community</h1>
        <CategoryBox></CategoryBox>
        <PostList posts={posts} ></PostList>
      </Wrap>

      <Button type="icon" to="/write"></Button>
    </MainDiv>
  );
}

export default MainPage;
