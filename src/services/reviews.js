import { db } from '../libs/firebase';
import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { createNotification } from './notifications';

// 후기 등록 API
export const createReview = async (
  postId,
  { content, authorUid, voteOption, imageUrl },
) => {
  const postRef = doc(db, 'posts', postId);

  // 후기 등록
  await updateDoc(postRef, {
    review: {
      content,
      createdAt: serverTimestamp(),
      authorUid,
      voteOption,
      imageUrl,
    },
  });

  // 투표 참여자들에게 알림 전송
  const postSnap = await getDoc(postRef);
  const voteParticipants = postSnap.data().vote?.participants || {};
  const participantUids = Object.keys(voteParticipants);

  await Promise.all(
    participantUids.map(uid =>
      createNotification({
        userUid: uid,
        type: 'review',
        postId,
        message: `익명 님이 후기를 작성했습니다.`,
      }),
    ),
  );
};
