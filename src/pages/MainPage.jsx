import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
`;

function MainPage() {
  return (
    <Container>
      <h1>메인페이지</h1>
    </Container>
  );
}

export default MainPage;
