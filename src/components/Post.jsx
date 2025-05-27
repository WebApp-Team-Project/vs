import styled from "styled-components";
import { useState, useEffect } from 'react';

import '../index.css';

const Container = styled.div`
display:flex;
flex-direction: column;
gap:23px;

margin-top:23px;
margin-bottom:14px;
`

const UserInfo = styled.div`
display:flex;
gap:8px;

div{
display:flex;
flex-direction:column;
gap:1px;
}

h1{
    color: var(--light--font);
    font-size: 14px;
    font-weight: 700;
}

span{ display:flex; gap: 5px; }

p{
    color: var(--gray--font);
    font-size: 10px;
    font-weight: 700;
}
`

const Wrap = styled.div`
display:flex;
flex-direction:column;
gap:10px;
color: var(--light--font);

h1{
    font-size: 16px;
    font-weight: 700;
}

p{
    font-size: 14px;
    font-weight: 400;
}
`

function Post(props){

    const {userId, title, content, timestamp} = props;

    return(

        <Container>
            <UserInfo>
                <img src="/images/icon_profile_gray.svg" />
                <div>
                    <h1>{userId || "익명"}</h1>
                    <span>
                        <p> 05/19 </p>
                        <p> 21:57 </p>
                    </span>
                </div>
            </UserInfo>

            <Wrap>
                <h1> {title ||"제목입니다"} </h1>
                <p>{content || "게시글 내용입니다"}</p>
            </Wrap>
        </Container>

    )
}

export default Post;