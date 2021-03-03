const countValue = (val: number) => (val > 255 ? 255 : val < 0 ? 0 : val);

export const getColor = (shade: number) => {
  const yellowOrBlue = countValue(shade);

  return `rgba(${countValue(shade + 255)}, ${yellowOrBlue}, ${yellowOrBlue}, 1)`;
};
