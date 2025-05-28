import { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../index.css';

import PostItem from './PostItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function PostList(props) {
  const { posts, colorThemes } = props;

  return (
    <Container>
      {posts.map(post => (
        <PostItem
          key={post.id}
          id={post.id}
          category={post.category}
          title={post.title}
          content={post.content}
          voteCount={post.voteCount}
          timelimit={getTimeLimitText(post.vote?.deadline)}
          commentsCount={post.commentsCount}
          colorTheme={colorThemes[post.category]}
          review={post.review}
        />
      ))}
    </Container>
  );
}

// 타임리밋을 텍스트로 바꿔주는 예시 함수
function getTimeLimitText(deadline) {
  if (!deadline?.toDate) return '시간 정보 없음';
  const diff = deadline.toDate() - new Date();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return hours > 0 ? `${hours}시간 남음` : '마감됨';
}

export default PostList;
