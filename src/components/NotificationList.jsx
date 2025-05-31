import styled from 'styled-components';
import NotificationItem from './NotificationItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

function NotificationList() {
  return (
    <Container>
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
      <NotificationItem />
    </Container>
  );
}

export default NotificationList;
