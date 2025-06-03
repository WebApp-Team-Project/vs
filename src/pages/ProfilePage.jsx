import styled from 'styled-components';
import { useEffect, useState } from 'react';
import '../index.css';
import { fetchPostsByStatusAndCategory } from '../services/posts';

import HeaderContainer from '../components/HeaderContainer';
import PostList from '../components/PostList';


const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

// const MockImg = styled.img`
//   width: 100%;
//   height: auto;
//   margin-top: 38px;
// `;

const NickName = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  margin-bottom: 24px;

  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  align-items: center;
`

const ProfileSelect = styled.div`
  display: flex;
  gap: 1px;
  width: 353px;
  height: 42px;
  margin-bottom: 18px;
`

const SelectInner = styled.button`
  font-size: 14px;
  font-weight: bold;
  background-color: #242424;
  color: #fff;
  border-bottom: 2px solid #4f9fec;
  border-top-left-radius: 6px;

  width: 176px;
  height: auto;
  text-align: center;
  align-items: center;
`

const COLOR_THEME = {
  전체: { color: 'var(--blue--color)', border: 'var(--blue--color)' },
  학교: { color: 'var(--green--color)', border: 'var(--green--color)' },
  연애: { color: 'var(--pink--color)', border: 'var(--pink--color)' },
  음식: { color: 'var(--yellow--color)', border: 'var(--yellow--color)' },
  일상: { color: '#8EE060', border: '#8EE060' },
};

function ProfilePage() {
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

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Profile' />
      <NickName><img src="/images/icon_profile_black.png" alt="" /> <p>미역국</p></NickName>
      <ProfileSelect>
        <SelectInner>게시글</SelectInner>
        <SelectInner>댓글</SelectInner>
      </ProfileSelect>
      <PostList posts={posts} colorThemes={COLOR_THEME} status={status} />

    </MainDiv>
  );
}

export default ProfilePage;
