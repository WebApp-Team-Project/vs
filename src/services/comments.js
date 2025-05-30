import { db } from '../libs/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { createNotification } from './notifications';

// 댓글 리스트 오름차순 조회 API
export const fetchComments = async postId => {
  const q = query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('createdAt', 'asc'),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 댓글 작성 API
export const addComment = async (postId, content, uid) => {
  // 댓글 추가
  await addDoc(collection(db, 'posts', postId, 'comments'), {
    content,
    createdAt: serverTimestamp(),
    authorUid: uid,
  });

  // posts 문서의 commentsCount 증가
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { commentsCount: increment(1) });

  // 알림 생성 (댓글 작성자 제외)
  const postSnap = await getDoc(postRef);
  const postAuthorUid = postSnap.data().authorUid;

  if (uid !== postAuthorUid) {
    await createNotification({
      userUid: postAuthorUid,
      type: 'comment',
      postId,
      message: `익명 님이 댓글을 작성했습니다.`,
    });
  }
};

// 댓글 삭제 API (필요시)
export const deleteComment = async (postId, commentId) => {
  const commentRef = doc(db, 'posts', postId, 'comments', commentId);
  await deleteDoc(commentRef);

  // posts 문서의 commentsCount 감소
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { commentsCount: increment(-1) });

  return true;
};

// 댓글 좋아요 API
export const likeComment = async (postId, commentId, uid) => {
  const likeRef = doc(db, 'posts', postId, 'comments', commentId, 'likes', uid);
  const likeSnap = await getDoc(likeRef);

  if (!likeSnap.exists()) {
    // 아직 좋아요를 누르지 않았을 때만 추가
    await setDoc(likeRef, { createdAt: serverTimestamp() });

    // 댓글 문서의 likes 숫자도 증가
    const commentRef = doc(db, 'posts', postId, 'comments', commentId);
    await updateDoc(commentRef, { likes: increment(1) });
    return true;
  } else {
    // 이미 누른 경우
    return false;
  }
};
