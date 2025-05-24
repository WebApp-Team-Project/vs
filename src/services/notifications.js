import { db } from '@/libs/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

// 나에게 온 알림 조회 API
export async function getNotifications(uid) {
  const q = query(
    collection(db, 'notifications'),
    where('userUid', '==', uid),
    orderBy('createdAt', 'desc'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
