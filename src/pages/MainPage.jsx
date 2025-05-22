import styled from 'styled-components';
import Example from '../components/Example';

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
      <Example />
    </Container>
  );
}

export default MainPage;
