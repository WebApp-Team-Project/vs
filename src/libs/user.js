// localStorage에 uid 저장
export const setUidToLocalStorage = uid => {
  const existingUid = localStorage.getItem('uid');
  if (!existingUid) {
    localStorage.setItem('uid', uid);
    console.log(`uid 저장: ${uid}`);
  }
};

// localStorage에서 uid 가져오기
export const getUidFromLocalStorage = () => {
  return localStorage.getItem('uid');
};

// localStorage에서 uid 삭제
export const removeUidFromLocalStorage = () => {
  localStorage.removeItem('uid');
};
