export const parseDate = (dateString: string): string => {
  const date: Date = new Date(dateString);
  const year = date.getFullYear();
  const month = (1 + date.getMonth());
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`
}

export const timeForToday = (dateString: string): string => {
  const today = new Date();
  const timeValue = new Date(dateString);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금 전';
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}