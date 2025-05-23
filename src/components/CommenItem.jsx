import styled from "styled-components";
import { useState, useEffect } from 'react';
import '../index.css'

function CommentItem(props){
    const {userId, content, date, likes, voteOptionId} = props;

    return(
        <CommentItem>
            <div>
                <h1>&lt;{userId || "익명" }&lt;</h1>
                <div>
                    <img src="따봉아이콘" alt="따봉아이콘" />
                    <p>{likes || " "}</p>
                </div> 
            </div>
            <p>{content || "댓글 내용입니다." }</p>
            <p>{date || "timestamp" }</p>
        </CommentItem>
    )
}

export default CommentItem;