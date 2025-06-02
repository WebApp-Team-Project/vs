import { db } from '../libs/firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

// 글 리스트 조회 API (진행여부 & 카테고리 필터)
export const fetchPostsByStatusAndCategory = async ({ status, category }) => {
  let q = query(collection(db, 'posts')); // posts 컬렉션 조회

  // 카테고리 필터
  if (category !== '전체') {
    q = query(q, where('category', '==', category));
  } else {
    q = query(q, where('category', 'in', ['학교', '연애', '음식', '일상']));
  }

  // 진행여부 필터
  if (status === 'open') {
    q = query(q, where('vote.deadline', '>', Timestamp.now()));
  } else if (status === 'closed') {
    q = query(q, where('vote.deadline', '<=', Timestamp.now()));
  }

  // 오름차순 정렬
  if (status === 'open') {
    q = query(q, orderBy('createdAt', 'desc'));
  } else {
    q = query(q, orderBy('vote.deadline', 'desc'));
  }

  const snapshot = await getDocs(q); // 조회 결과

  const response = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    voteCount: doc.data().vote?.participants
      ? Object.keys(doc.data().vote.participants).length
      : 0,
    commentsCount: doc.data().commentsCount || 0,
  }));

  return response;
};

// 글 상세 조회 API
export const fetchPostDetailByPostId = async postId => {
  const docSnap = await getDoc(doc(db, 'posts', postId));
  const response = docSnap.exists()
    ? { id: docSnap.id, ...docSnap.data() }
    : null;

  return response;
};

// 글 작성 API
export const createPost = async ({
  authorUid,
  category,
  title,
  content,
  options,
  deadline,
}) => {
  const response = await addDoc(collection(db, 'posts'), {
    authorUid,
    category,
    title,
    content,
    createdAt: serverTimestamp(),
    vote: {
      authorUid,
      options, // ["함돈", "트랩", ...]
      deadline, // Timestamp
      participants: {}, // uid: optionIndex
    },
    review: null,
    commentsCount: 0,
  });

  return response;
};
