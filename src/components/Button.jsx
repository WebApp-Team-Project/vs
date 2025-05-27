import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const LongButton = styled.button`
  width: 100%;
  height: auto;
  align-items: center;
  text-align: center;

  font-family: 'D2Coding', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  background-color: var(--main--color);
  border: none;
  border-radius: 8px;
  padding: 12px 0px;

  cursor: pointer;
`;

const ShortButton = styled(LongButton)`
  width: 64px;
  height: 32px;
  padding: 12px 20px;
  justify-content: center;
  text-align:center;
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
  border-radius:100px;
`

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
      <LongButton  onClick={handleClick}>{props.title || 'Upload'}</LongButton>
    );
  } else if (type === 'short') {
    return (
      <ShortButton onClick={handleClick}>
        {props.title || 'Upload'}
      </ShortButton>
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
        <img src='/images/icon_writing.svg'  style={{ pointerEvents: 'none' }} />
      </IconButton>
    )
  }
}

export default Button;
