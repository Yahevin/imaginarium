export const getDate = (timestamp: number | string) => {
  const date = new Date(timestamp);

  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
