import styled from 'styled-components';
import NotificationItem from './NotificationItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const LineDiv = styled.div`
  width: 353px;
  height: 10px;
  background-color: #2a2a2a;
  margin-top: 6px;
`


function NotificationList() {
  return (
    <Container>
      <LineDiv></LineDiv>

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
