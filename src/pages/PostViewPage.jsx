import styled from 'styled-components';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

function PostViewPage() {
  return (
    <MainDiv>
      <h1 style={{ color: '#fff' }}>PostView 페이지</h1>
    </MainDiv>
  );
}

export default PostViewPage;
