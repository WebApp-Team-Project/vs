import styled from 'styled-components'
import {useState, useEffect} from 'react'

const LongButton = styled.button`
    width: 350px;
    height: auto;
    align-items: center;
    text-align: center;

    font-family: 'D2Coding', 'Pretendard', sans-serif;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
    background-color: #4F9FEC;
    border: none;
    border-radius: 8px;
    padding: 12px 0px;

    cursor: pointer;
`
const ShortButton = styled(LongButton)`
    width: 64px;
    font-size: 12px;
`

const WriteButton = styled(LongButton)`
    font-size: 12px;
    font-family: 'IBMPlexSansKR-Regular', 'Pretendard', sans-serif;

`


function Button(props){

    const type = props.type || "long"
    if(type === "long"){
        return <LongButton onClick={props.onClick}>
            {props.title || "Upload"}
        </LongButton>
    }else if(type === "short"){
        return <ShortButton onClick={props.onClick}>
            {props.title || "Upload"}
        </ShortButton>
    }else if(type === "write"){
        return <WriteButton onClick={props.onClick}>
            {props.title || "후기 작성하기"}
        </WriteButton>
    }

}

export default Button