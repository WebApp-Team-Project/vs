import styled from 'styled-components';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import HeaderContainer from '../components/HeaderContainer';
import '../index.css';

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchPostDetailByPostId } from '../services/posts';
import { useDropzone } from 'react-dropzone';
import { createReview } from '../services/reviews';
import { getUidFromLocalStorage } from '../libs/user';
// import { db } from '../libs/firebase';

const MainDiv = styled.div`
  width: 393px;
  height: 852px;
  padding: 40px 20px;
  margin: 0 auto;
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
  width: 353px;
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
  background-color: ${props => {
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
`;

const DropZoneArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 139px;
  border: 1px dashed #515151;
  border-radius: 6px;
  cursor: pointer;
  background-color: #202020;
  overflow: hidden;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--blue--color);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [picks, setPicks] = useState([]);
  const [selectedPick, setSelectedPick] = useState(0);
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // 선택지 선택 핸들러
  const handlePickSelect = index => {
    setSelectedPick(index);
  };

  // 후기 등록 버튼 클릭 핸들러
  const handleUploadButtonClick = () => {
    createReview(id, {
      content,
      authorUid: getUidFromLocalStorage(),
      voteOption: selectedPick,
      imageUrl: thumbnail,
    })
      .then(() => {
        navigate(-1);
      })
      .catch(error => {
        console.error('후기 등록 중 오류:', error);
      });
  };

  useEffect(() => {
    if (id) {
      fetchPostDetailByPostId(id)
        .then(result => {
          setPicks(result.vote.options);
        })
        .catch(error => {
          console.error('게시글 조회 중 오류:', error);
        });
    }
  }, [id]);

  // Dropzone 설정
  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onDrop = useCallback(
    async acceptedFiles => {
      const file = acceptedFiles[0];
      if (file) {
        const base64 = await getBase64(file);
        setThumbnail(base64);
      }
    },
    [setThumbnail],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <MainDiv>
      <HeaderContainer type='pages' title='Review'></HeaderContainer>
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
          <TextInput
            type='input'
            text='내용을 작성해주세요!'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </WriteDiv>
        <WriteDiv>
          <label htmlFor=''>이미지 첨부</label>
          <DropZoneArea {...getRootProps()}>
            <input {...getInputProps()} />
            {thumbnail ? (
              <img src={thumbnail} />
            ) : (
              <img
                style={{ width: '54px', height: '54px' }}
                src='/images/icon_image.svg'
              />
            )}
          </DropZoneArea>
        </WriteDiv>
      </MainInner>

      <ButtonDiv>
        <Button type='long' onClick={handleUploadButtonClick} />
      </ButtonDiv>
    </MainDiv>
  );
}

export default ReviewPage;
