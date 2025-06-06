import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const LongButton = styled.button`
  width: 100%;
  height: auto;
  align-items: center;
  text-align: center;

  font-family: 'IBM Plex Sans KR', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  background-color: var(--main--color);
  border: none;
  border-radius: 8px;
  padding: 12px 0px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--blue--color);
  }
`;

const ShortButton = styled(LongButton)`
  display: flex;
  width: 40px;
  height: 32px;
  padding: 12px 12px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const WriteButton = styled(LongButton)`
  font-size: 12px;
  font-family: 'IBMPlexSansKR-Regular', 'Pretendard', sans-serif;
`;

const IconButton = styled(LongButton)`
  width: 52px;
  height: 52px;
  border-radius: 100px;
  margin-right: 30px;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--blue--color);
  }
`;

function Button(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.to) {
      navigate(props.to);
    } else if (props.onClick) {
      props.onClick();
    }
  };

  const type = props.type || 'long';

  if (type === 'long') {
    return (
      <LongButton onClick={handleClick}>{props.title || 'Upload'}</LongButton>
    );
  } else if (type === 'short') {
    return (
      <ShortButton onClick={handleClick}><img src="/images/comment_send.png" alt="" width="16px"/></ShortButton>
    );
  } else if (type === 'write') {
    return (
      <WriteButton onClick={handleClick}>
        {props.title || '후기 작성하기'}
      </WriteButton>
    );
  } else if (type === 'icon') {
    return (
      <IconButton onClick={handleClick}>
        <img src='/images/icon_writing.svg' style={{ pointerEvents: 'none' }} />
      </IconButton>
    );
  }
}

export default Button;
