import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid var(--gray500--color);
  gap: 6px;
  padding: 20px 18px 18px 20px;
  font-family: 'IBM Plex Sans', sans-serif;
  cursor: pointer;
`;

const NotificationTitle = styled.h2`
  font-size: 0.9375rem;
  color: var(--light--font);
  line-height: 1.25rem;
  font-weight: 400;


  span {
    font-weight: bold;
  }
`;

const MessageandTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1rem;
  color: #7d7d7d;
  font-size: 0.75rem;
  width: 100%;

  > h3{
    font-size: 10px;
    font-weight: 400;
  }
`;

function NotificationItem() {
  return (
    <Container>
      <NotificationTitle>
        <span>익명 </span>님이 대댓글을 작성했습니다.
      </NotificationTitle>
      <MessageandTimeContainer>
        <p>근데 트랩이 더 나을걸 요즘은</p>
        <h3>14:02</h3>
      </MessageandTimeContainer>
    </Container>
  );
}

export default NotificationItem;
