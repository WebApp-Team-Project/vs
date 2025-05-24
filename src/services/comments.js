import { db } from '@/libs/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';

// 댓글 리스트 조회 API
export async function getComments(postId) {
  const snapshot = await getDocs(collection(db, 'posts', postId, 'comments'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 댓글 작성 API
export async function addComment(postId, content, uid) {
  return addDoc(collection(db, 'posts', postId, 'comments'), {
    content,
    likes: 0,
    createdAt: serverTimestamp(),
    authorUid: uid,
  });
}

// 댓글 좋아요 API (likes 숫자만 증가, 중복 방지는 추가 로직 필요)
export async function likeComment(postId, commentId) {
  const commentRef = doc(db, 'posts', postId, 'comments', commentId);
  await updateDoc(commentRef, { likes: increment(1) });
}
