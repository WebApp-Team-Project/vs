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
`;

function NotificationList() {
  return (
    <Container>
      <LineDiv></LineDiv>

      <NotificationItem
        status={'reply'}
        message={'근데 트랩이 더 나을걸 요즘은'}
      />
      <NotificationItem
        status={'vote'}
        message={'함돈vs트랩vs기타 투표 결과 보러가기'}
      />
      <NotificationItem
        status={'vote'}
        message={'함돈vs트랩vs기타 투표 결과 보러가기'}
      />
      <NotificationItem
        status={'reply'}
        message={'근데 트랩이 더 나을걸 요즘은'}
      />
      <NotificationItem
        status={'vote'}
        message={'함돈vs트랩vs기타 투표 결과 보러가기'}
      />
    </Container>
  );
}

export default NotificationList;
