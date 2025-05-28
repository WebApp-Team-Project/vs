import styled from "styled-components";
import { useState, useEffect } from 'react';
import '../index.css'
import Button from "./Button";

const colorMap = {
  0: 'var(--yellow--color)',
  1: 'var(--green--color)',
  2: 'var(--orange--color)',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  background-color: var(--gray800--color);
  border: 1px solid var(--outline--color);
`;

const VoteOption = styled.div`
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
    color: var(--font-font_light, #FFF);
    font-family: "IBM Plex Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display:flex;
    justify-content: space-between;
    align-items: center;


    background-color: ${props =>
    props.selected ? colorMap[props.index] : 'var(--gray600--color)'};

  &:hover {
    background-color: ${props =>
      colorMap[props.index] || '#505050'};
  }
`;

const FlexBox =styled.span`
    display:flex;
    justify-content: space-between;
    align-items: center;    

    h1{
    font-size: 12px;
    }

    h2{
    font-size: 10px;}
`

const Imgspan = styled.span`
color: var(--light--font);

display: flex;
align-items: center;
text-align: center;
gap: 4px;

h1{font-family: "IBM Plex Sans";
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: normal;}

h2{
font-family: "IBM Plex Sans";
font-size: 10px;
font-style: normal;
font-weight: 700;
line-height: normal;
}
`

const Imgspan2 = styled.span`
color: var(--light--font);

display: flex;
align-items: center;
gap: 2.5px;

h3{
color: var(--gray2, #7D7D7D);
font-family: "IBM Plex Sans";
font-size: 6.4px;
font-style: normal;
font-weight: 700;
line-height: normal;}
`

function VoteContainer(props){

  const [selectedPick, setSelectedPick] = useState(0);
  
  const picks = ['선택지1', '선택지2', '선택지3'];
  const turnout =  props.turnout || '8명';

  const type = props.type || '1';

  const handlePickSelect = (index) => {
  setSelectedPick(index);
  };

    if( type === '1' ){
    return(
        <Container>
            <FlexBox>
                <Imgspan>
                    <img src="/images/icon_vote.svg"/>
                    <h1>투표</h1>
                </Imgspan>
                <Imgspan>
                    <img src="/images/icon_clock.svg"/>
                    <h2>3시간 남음</h2>
                </Imgspan>
            </FlexBox>
         {/* 선택지 갯수에 맞게 보이게 함함 */}
          {picks.map((pick, index) => (
            <VoteOption
              key={index}
              index={index}
              selected={selectedPick === index}
              onClick={() => handlePickSelect(index)}
            >
              <span>{pick}</span>
            </VoteOption>
          ))}
            <Button type="long" title="투표하기"></Button>
            <Imgspan2>
                <img src="/images/icon_people.svg"/>
                <h3>3,000</h3>
            </Imgspan2>
        </Container>
    )}else if(type === '2'){
        return(
                    <Container>
            <FlexBox>
                <Imgspan>
                    <img src="/images/icon_vote.svg"/>
                    <h1>투표</h1>
                </Imgspan>
                <Imgspan>
                    <img src="/images/icon_clock.svg"/>
                    <h2>3시간 남음</h2>
                </Imgspan>
            </FlexBox>

                    {picks.map((pick, index) => (
            <VoteOption
                key={index}
                index={index}
                selected={selectedPick === index}
                onClick={() => handlePickSelect(index)}
            >
                {/* 조건: type이 '2'이고 선택된 항목이 index 0일 때만 아이콘 표시 */}
                <Imgspan>
                {type === '2' && selectedPick === index && (
                <img src="/images/icon_check.svg"/>
                )}
              <span>{pick}</span>
              </Imgspan>
              <span>{turnout}</span>
                
            </VoteOption>
            ))}

            <Imgspan2>
                <img src="/images/icon_people.svg"/>
                <h3>3,000</h3>
            </Imgspan2>
        </Container>
        )
    }else if(type === '3'){
        return(
            <Container>
            <FlexBox>
                <Imgspan>
                    <img src="/images/icon_vote.svg"/>
                    <h1>투표</h1>
                </Imgspan>
                <Imgspan>
                    <img src="/images/icon_clock.svg"/>
                    <h2>마감</h2>
                </Imgspan>
            </FlexBox>

         {picks.map((pick, index) => (
            <VoteOption
                key={index}
                index={index}
                selected={selectedPick === index}
                onClick={() => handlePickSelect(index)}
            >
                {/* 조건: type이 '3'이고 선택된 항목이 index 0일 때만 아이콘 표시 */}
                <Imgspan>
                {type === '3' && selectedPick === index && (
                <img src="/images/icon_crown.svg"/>
                )}
              <span>{pick}</span>
              </Imgspan>
              <span>{turnout}</span>
            </VoteOption>
            ))}

            <Imgspan2>
                <img src="/images/icon_people.svg"/>
                <h3>3,000</h3>
            </Imgspan2>
        </Container>
        )
    }

}

export default VoteContainer;