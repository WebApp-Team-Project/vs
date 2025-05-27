import styled from 'styled-components';
import '../index.css';

const PickDiv = styled.div`
    width: 353px;
    height: auto;

    margin-top: 34px; margin-bottom: 34px;
`

const PickHeader = styled.div`
    width: 353px;
    height: 18px;
    display: flex;
    gap: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;

    text-align: center;
    margin-bottom: 8px;

    align-items: center;
`

const PickChip = styled.div`
    width: auto;
    height: 18px;
    font-size: 8px;
    background-color: var(--yellow--color);
    // 선택한것에 따라 바뀌게게
    border-radius: 50px;
    padding: 2px 10px;
`

const PickContent = styled.div`
    width: 353px;
    height: auto;
    background-color: #242424;
    border: 1px solid #575757;
    border-radius: 6px;
    color: #fff;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: nomal;
`


function Pick(props) {

  return (
    <PickDiv>
        <PickHeader>
            작성자의 Pick
            <PickChip>선택지1</PickChip>
        </PickHeader>
        <PickContent>작성자 후기</PickContent>
    </PickDiv>
  );
}

export default Pick;