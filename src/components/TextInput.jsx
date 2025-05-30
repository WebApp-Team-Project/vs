import styled from 'styled-components';
import '../index.css';

const StyledTextArea = styled.textarea`
  background-color: #202020;
  flex: 1;
  height: ${props => props.height}px;
  display: block;
  border: 1px solid #515151;
  border-radius: 6px;
  font-size: 11px;
  font-weight: regular;
  padding: 10px 12px;
  color: #d9d9d9;
  transition: all 0.2s ease;

  resize: none;
  overflow: hidden;

  &::placeholder {
    color: #525252;
  }

  &:focus {
    outline: none;
    border: 1px solid #7d7d7d;
    color: #d9d9d9;
  }

  &:focus::placeholder {
    color: #7d7d7d;
  }
`;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  background-color: #202020;
  flex: 1;
  height: ${props => props.height}px;
  border: 1px solid #515151;
  border-radius: 6px;
  font-size: 11px;
  font-weight: regular;
  padding: 0 12px;
  color: #d9d9d9;
  transition: all 0.2s ease;

  resize: none;
  overflow: hidden;

  &::placeholder {
    color: #525252;
  }

  &:focus {
    outline: none;
    border: 1px solid #7d7d7d;
    color: #d9d9d9;
  }

  &:focus::placeholder {
    color: #7d7d7d;
  }
`;

const SelectTextArea = styled(StyledInput)`
  width: 100%;
  height: 34px;
  background-color: #505050;
  border: 1px solid #6e6e6e;
`;

const RemoveOptionBtn = styled.button`
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    img {
      opacity: 0.8;
    }
  }

  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }
`;

function TextInput(props) {
  // height: 높이, value & onChange: 제어 컴포넌트용
  const { height, value, onChange, text, index, onSelectRemove, onKeyPress } =
    props;

  const type = props.type || 'origin';
  if (type === 'origin') {
    return (
      <StyledTextArea
        height={height || 34}
        placeholder={text || '입력하세요'}
        value={value}
        onChange={onChange}
      ></StyledTextArea>
    );
  } else if (type === 'select') {
    return (
      <div style={{ position: 'relative' }}>
        <SelectTextArea
          placeholder={text || ' '}
          value={value}
          onChange={onChange}
        ></SelectTextArea>

        {/* 3번째 선택지만 버튼이 보임 */}
        {index === 3 && onSelectRemove && (
          <RemoveOptionBtn type='button' onClick={onSelectRemove}>
            <img src='/images/icon_cancel.svg' alt='' />
          </RemoveOptionBtn>
        )}
      </div>
    );
  } else if (type === 'input') {
    return (
      <StyledInput
        height={height || 34}
        placeholder={text || '입력하세요'}
        value={value}
        onChange={onChange}
        onKeyPress={e => {
          if (onKeyPress) onKeyPress(e);
        }}
      ></StyledInput>
    );
  }
}

export default TextInput;
