import { db } from '../libs/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

// 나에게 온 알림 조회 API
export const fetchNotifications = async uid => {
  const q = query(
    collection(db, 'notifications'),
    where('userUid', '==', uid),
    orderBy('createdAt', 'desc'),
  );
  const snapshot = await getDocs(q);

  const response = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return response;
};

// 알림 등록 API
export const createNotification = async ({
  userUid,
  type,
  postId,
  commentId = null,
  message,
}) => {
  const response = await addDoc(collection(db, 'notifications'), {
    userUid,
    type,
    postId,
    commentId,
    createdAt: serverTimestamp(),
    isRead: false,
    message,
  });

  return response;
};
