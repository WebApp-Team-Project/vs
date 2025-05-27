import styled from "styled-components";
import { useState, useEffect } from 'react';
import '../index.css';

const Container = styled.div`
background-color
`

function PostItem(props){

    const { category, title, content, likes, timelimit, comments } =props;

    return(
        <Container>
            PostItem
        </Container>
    )
}

export default PostItem;