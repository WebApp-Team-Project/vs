// voteStats에서 가장 높은 투표율을 가진 인덱스 반환
export const getHighestRateIndex = voteStats => {
  if (!Array.isArray(voteStats)) return null;

  let highestRateIndex = 0;
  let highestRate = voteStats[0]?.rate || 0;

  for (let i = 1; i < voteStats.length; i++) {
    if (voteStats[i]?.rate > highestRate) {
      highestRateIndex = i;
      highestRate = voteStats[i]?.rate;
    }
  }

  return highestRateIndex;
};
