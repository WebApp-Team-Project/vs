import { db } from '@/libs/firebase';
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
} from 'firebase/firestore';

// 글 리스트 조회 API (진행여부 & 카테고리 필터)
export async function getPostsByStatusAndCategory({ status, category }) {
  const now = Timestamp.now();
  let q = query(collection(db, 'posts'));

  if (category) {
    q = query(q, where('category', '==', category));
  }
  if (status === 'open') {
    q = query(q, where('vote.deadline', '>', now));
  } else if (status === 'closed') {
    q = query(q, where('vote.deadline', '<=', now));
  }
  q = query(q, orderBy('vote.deadline', 'asc'), limit(30));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    voteCount: doc.data().vote?.participants?.length || 0,
    commentsCount: doc.data().comments
      ? Object.keys(doc.data().comments).length
      : 0, // 댓글 수
  }));
}

// 글 상세 조회 API
export async function getPostDetailByPostId(postId) {
  const docSnap = await getDoc(doc(db, 'posts', postId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// 글 작성 API
export async function createPost({
  authorUid,
  category,
  title,
  content,
  options,
  deadline,
}) {
  return addDoc(collection(db, 'posts'), {
    authorUid,
    category,
    title,
    content,
    createdAt: Timestamp.now(),
    vote: {
      options, // ["", "", ...]
      deadline, // Timestamp
      participants: [], // uid[]
      status: 'open',
    },
    review: null,
  });
}
