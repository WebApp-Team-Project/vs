import styled from "styled-components";
import { useState, useEffect } from 'react';
import '../index.css';

const Container = styled.div`
background-color: #242424;
color: var(--light--font);
border: 0.7px solid #414141;
border-radius: 8px;

padding: 10px 20px;
`

const Topdiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 10px;

h2{ font-size: 10px; }
h3{ font-size: 10px; }
`

const Maindiv = styled.div`
display:flex;
flex-direction:column;
align-items: flex-start;
gap: 8px;

margin: 13px 0px;

h1{ font-size: 16px; }
p{ font-size: 12px; }
`

const Bottomdiv = styled(Topdiv)`
gap:10px;
justify-content: start;

font-size: 8px;
`

const Imgspan = styled.span`
display:flex;
color: var(--gray--font);
`

function PostItem(props){

    const { category, title, content, votes, timelimit, comments } =props;

    return(
        <Container>
            <Topdiv>
                <h2>&lt;{category || "음식"}&gt;</h2>
                <Imgspan>
                    <img></img>
                    <h3>{ timelimit ||"3시간 남음"}</h3>
                </Imgspan>
            </Topdiv>
            <Maindiv>
                <h1>{title || "제목입니다"}</h1>
                <p>{ content || "게시글 내용입니다"}</p>
            </Maindiv>
            <Bottomdiv>
                <Imgspan>
                    <img></img>
                    <p>{ votes || "14"}</p>
                </Imgspan>
                <Imgspan>
                    <img></img>
                    <p>{ comments || "14"}</p>
                </Imgspan>
            </Bottomdiv>
        </Container>
    )
}

export default PostItem;