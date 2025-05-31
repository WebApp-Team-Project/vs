import dayjs from 'dayjs';

// 마감일 지났는지 확인
export const isDeadlinePassed = deadline => {
  if (!deadline?.toDate) return false;
  return dayjs(deadline.toDate()).isBefore(dayjs());
};
