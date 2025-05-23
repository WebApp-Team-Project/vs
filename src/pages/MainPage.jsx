import styled from 'styled-components';
import Example from '../components/Example';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import CategoryBox from '../components/CategoryBox';

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
      <Comment></Comment>
      <Button>Button</Button>
      <TextInput>입력</TextInput>
    </Container>
  );
}

export default MainPage;
