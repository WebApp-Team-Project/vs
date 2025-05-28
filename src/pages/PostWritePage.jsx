import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Button from '../components/Button';
import CategoryBox from '../components/CategoryBox';
import TextInput from '../components/TextInput';
import HeaderContainer from '../components/HeaderContainer';

import { createPost } from '../services/posts';

import { Timestamp } from 'firebase/firestore';
import { getUidFromLocalStorage } from '../libs/user';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;

  position: relative;
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
const SelectDiv = styled.div`
  background-color: #202020;
  width: 353px;
  height: auto;
  border: 1px solid #515151;
  border-radius: 8px;

  display: grid;
  gap: 16px;
  font-size: 12px;
  font-weight: regular;
  padding: 16px;
  color: #fff;
`;
const SelectOption = styled.div`
  display: grid;
  gap: 6px;
`;
const ImgDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;
const ButtonDiv = styled.div`
  width: 353px;
  position: absolute;
  bottom: 40px;
`;

function PostWritePage(props) {
  const navigate = useNavigate();

  const [optionCount, setOptionCount] = useState(2);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState(''); // 문자열로 입력받고 Timestamp로 변환

  // 업로드 버튼 클릭 핸들러
  const writePost = async () => {
    const authorUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

    if (!category || !title || !content) {
      alert('내용을 모두 작성해주세요!');
      return;
    }

    // 글 작성 API 호출
    createPost({
      authorUid,
      category: '학교',
      title,
      content,
      options: ['함돈', '트랩'],
      deadline: Timestamp.fromDate(new Date(Date.now() + 3600 * 1000 * 12)),
    })
      .then(() => {
        alert('글이 등록되었습니다!');
        navigate('/');
      })
      .catch(e => {
        console.error('글 작성 중 오류:', e);
      });
  };

  const handleAddOption = () => {
    setOptionCount(optionCount + 1);
  };

  const renderOptions = () => {
    const options = [];

    for (let i = 1; i <= optionCount; i++) {
      options.push(
        <SelectOption key={i}>
          <label htmlFor=''>선택지 {i}</label>
          <TextInput type='select' />
        </SelectOption>,
      );
    }

    return options;
  };

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Write Post'></HeaderContainer>
      <MainInner>
        <WriteDiv>
          <label htmlFor=''>카테고리</label>
          <CategoryBox
            categories={['<학교>', '<연애>', '<음식>', '<일상>']}
            colorThemes={{
              '<학교>': { color: '#51BAF3', border: '#51BAF3' },
              '<연애>': { color: '#EB5DE9', border: '#EB5DE9' },
              '<음식>': { color: '#EEBA4E', border: '#EEBA4E' },
              '<일상>': { color: '#8EE060', border: '#8EE060' },
            }}
            onChange={category => {
              setCategory(category.replace(/[<>]/g, ''));
            }}
          />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>제목</label>
          <TextInput
            text='제목을 작성해주세요!'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>내용</label>
          <TextInput
            text='내용을 작성해주세요!'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>선택지 입력</label>

          <SelectDiv>
            {renderOptions()}

            {/* 선택지가 2개일때만 이미지가 보임 */}
            {optionCount < 3 && (
              <ImgDiv onClick={handleAddOption}>
                <img src='/images/select-add.png' alt='' height='24px' />
              </ImgDiv>
            )}
          </SelectDiv>
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>마감시간</label>
          <TextInput text='마감시간을 작성해주세요!' />
        </WriteDiv>
      </MainInner>

      <ButtonDiv>
        <Button onClick={writePost} />
      </ButtonDiv>
    </MainDiv>
  );
}

export default PostWritePage;
