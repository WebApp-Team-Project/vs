import { db } from '../libs/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// 투표 참여 API
export const submitVote = async (postId, optionIndex, uid) => {
  const postRef = doc(db, 'posts', postId);

  // 투표 옵션 저장 (중복 투표 방지)
  await updateDoc(postRef, {
    [`vote.participants.${uid}`]: optionIndex,
  });
};
