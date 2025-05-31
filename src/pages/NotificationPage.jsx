import styled from 'styled-components';
import HeaderContainer from '../components/HeaderContainer';
import NotificationList from '../components/NotificationList';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 393px;
  min-height: 100vh;
  height: fit-content;
  padding: 40px 20px;
  margin: 0 auto;
`;

function NotificationPage() {
  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Notifications' />
      <NotificationList />
    </MainDiv>
  );
}

export default NotificationPage;
