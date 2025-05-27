import { useState, useEffect } from 'react';
import styled from "styled-components";
import '../index.css';

import PostItem from './PostItem';

const Container = styled.div`
display:flex;
flex-direction:column;
gap:16px;
`

function PostList({posts}) {
  return (
    <Container>
      {posts.map(post => (
        <PostItem
          key={post.id}
          category={post.category}
          title={post.title}
          content={post.content}
          votes={post.voteCount}
          timelimit={getTimeLimitText(post.vote?.deadline)}
          comments={post.commentsCount}
        />
      ))}
    </Container>
  );
}

// 타임리밋을 텍스트로 바꿔주는 예시 함수
function getTimeLimitText(deadline) {
  if (!deadline?.toDate) return "시간 정보 없음";
  const diff = deadline.toDate() - new Date();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return hours > 0 ? `${hours}시간 남음` : "마감됨";
}

export default PostList;