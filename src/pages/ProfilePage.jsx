import styled from 'styled-components';
import HeaderContainer from '../components/HeaderContainer';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const MockImg = styled.img`
  width: 100%;
  height: auto;
  margin-top: 38px;
`;

function ProfilePage() {
  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Profile' />
      <MockImg src='/images/profile_mock.png' />
    </MainDiv>
  );
}

export default ProfilePage;
