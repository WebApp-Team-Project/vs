import styled from 'styled-components';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import '../index.css';

import { useState, useEffect } from "react";
// import { db } from '../libs/firebase';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const HeaderDiv = styled.div`
  font-family: 'D2Coding', 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #fff;

  display: flex;
  gap: 144.5px;
  align-items: center;
  text-align: center;
`;

const MainInner = styled.div`
  width: 353px;
  display: grid;
  gap: 32px;
  margin-top: 40px;
`;

const WriteDiv = styled.div`
  width: 353px;
  font-size: 12px;
  color: #fff;
  display: grid;
  gap: 10px;
`;

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 40px;
`;

const PickDiv = styled.div`
  width: 353px;
  height: auto;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  padding: 8px 20px;
  background-color:${props => {
    if (props.selected) {
      if (props.index === 0) return 'var(--yellow--color)';
      if (props.index === 1) return 'var(--green--color)';
      if (props.index === 2) return 'var(--orange--color)';
    }
    return '#505050';
  }};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`

function ReviewPage() {

  const [selectedPick, setSelectedPick] = useState(0);
  
  const picks = ['선택지1', '선택지2', '선택지3'];
  // 나중에 선택지 값으로 대체

  const handlePickSelect = (index) => {
    setSelectedPick(index);
  };

  return (
    <MainDiv>
      <HeaderDiv>
        <img src='/images/back-icon.png' alt='' height='15px' />
        Review
      </HeaderDiv>
      <MainInner>
        <WriteDiv>
          <label htmlFor=''>나의 PICK</label>
          {/* 선택지 갯수에 맞게 보이게 함함 */}
          {picks.map((pick, index) => (
            <PickDiv
              key={index}
              index={index}
              selected={selectedPick === index}
              onClick={() => handlePickSelect(index)}
            >
              {pick}
            </PickDiv>
          ))}
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>내용</label>
          <TextInput text='내용을 작성해주세요!' />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>이미지 첨부</label>
          <input type="file" accept='image/*' />
        </WriteDiv>
      </MainInner>

      <ButtonDiv>
        <Button />
      </ButtonDiv>
    </MainDiv>
  );
}

export default ReviewPage;
