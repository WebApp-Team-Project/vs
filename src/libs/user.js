// localStorage에 uid 저장
export const setUidToLocalStorage = uid => {
  const existingUid = localStorage.getItem('WEBAPP_TEAM_PROJECT_UID');
  if (!existingUid) {
    localStorage.setItem('WEBAPP_TEAM_PROJECT_UID', uid);
  }
};

// localStorage에서 uid 가져오기
export const getUidFromLocalStorage = () => {
  return localStorage.getItem('WEBAPP_TEAM_PROJECT_UID');
};

// localStorage에서 uid 삭제
export const removeUidFromLocalStorage = () => {
  localStorage.removeItem('WEBAPP_TEAM_PROJECT_UID');
};
