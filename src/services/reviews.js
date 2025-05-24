import { db } from '@/libs/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// 후기 등록 API (글 도큐먼트 내 review 필드 업데이트)
export async function createReview(
  postId,
  { content, authorUid, voteOption, imageUrl },
) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    review: {
      content,
      createdAt: serverTimestamp(),
      authorUid,
      voteOption,
      imageUrl,
    },
  });
}
