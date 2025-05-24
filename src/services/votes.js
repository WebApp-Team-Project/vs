import { db } from '@/libs/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

// 투표 참여
export async function vote(postId, optionIndex, uid) {
  const postRef = doc(db, 'posts', postId);
  // Firestore 트랜잭션/배치로 중복투표, 옵션별 집계 등 세밀하게 관리 가능
  await updateDoc(postRef, {
    'vote.participants': arrayUnion(uid),
    // TODO:옵션별 득표수 관리 필요 "vote.options.0.count" 증가 등 추가
  });
}
