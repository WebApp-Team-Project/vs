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
  width: 24px;
  height: 24px;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }
`;
const ButtonDiv = styled.div`
  width: 353px;
  position: absolute;
  bottom: 40px;
`;

const DeadLineItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  padding: 0 16px;
  border-radius: 50px;
  background-color: var(--gray800--color);
  border: 1px solid
    ${({ $active }) => ($active ? 'var(--light--font)' : 'var(--gray--font)')};
  color: ${({ $active }) =>
    $active ? 'var(--light--font)' : 'var(--gray--font)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CATEGORY_LIST = ['학교', '연애', '음식', '일상'];

const COLOR_THEME = {
  학교: { color: 'var(--green--color)', border: 'var(--green--color)' },
  연애: { color: 'var(--pink--color)', border: 'var(--pink--color)' },
  음식: { color: 'var(--yellow--color)', border: 'var(--yellow--color)' },
  일상: { color: '#8EE060', border: '#8EE060' },
};

const DEADLINE_LIST = ['6시간', '12시간', '24시간', '3일'];

function PostWritePage() {
  const navigate = useNavigate();

  const [optionCount, setOptionCount] = useState(2);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState([]);
  const [deadline, setDeadline] = useState('');

  // 업로드 버튼 클릭 핸들러
  const writePost = async () => {
    const authorUid = getUidFromLocalStorage(); // 로컬스토리지에서 uid 가져오기

    if (!category || !title || !content || !deadline || !options.length) {
      alert('내용을 모두 작성해주세요!');
      return;
    }

    const DEADLINE_HOURS = {
      '6시간': 6,
      '12시간': 12,
      '24시간': 24,
      '3일': 72,
    };

    const hours = DEADLINE_HOURS[deadline];
    const deadlineDate = new Date(Date.now() + hours * 60 * 60 * 1000);

    // 글 작성 API 호출
    createPost({
      authorUid,
      category,
      title,
      content,
      options,
      deadline: Timestamp.fromDate(deadlineDate),
    })
      .then(() => {
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
          <label htmlFor=''>{`{ 선택지 ${i} }`}</label>
          <TextInput
            index={i}
            type='select'
            text='20자 이내로 작성해주세요.'
            value={options[i - 1]}
            onChange={e =>
              setOptions(prev => [...prev.slice(0, i - 1), e.target.value])
            }
            // 3번째 선택지에만 삭제 이벤트 추가
            onSelectRemove={
              optionCount === 3 && i === 3
                ? () => {
                    setOptionCount(2);
                    setOptions(prev => prev.slice(0, 2));
                  }
                : undefined
            }
          />
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
            categories={CATEGORY_LIST}
            colorThemes={COLOR_THEME}
            setCategory={setCategory}
            selectedCategory={category}
          />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>제목</label>
          <TextInput
            text='제목을 작성해주세요!'
            type='input'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>내용</label>
          <TextInput
            text='내용을 작성해주세요!'
            type='input'
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
          {/* <TextInput text='마감시간을 작성해주세요!' /> */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {DEADLINE_LIST.map((item, index) => (
              <DeadLineItem
                key={`${item}-${index}`}
                $active={deadline === item}
                onClick={() => setDeadline(item)}
              >
                {item}
              </DeadLineItem>
            ))}
          </div>
        </WriteDiv>
      </MainInner>

      <ButtonDiv>
        <Button onClick={writePost} />
      </ButtonDiv>
    </MainDiv>
  );
}

export default PostWritePage;
