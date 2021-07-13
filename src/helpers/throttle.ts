export const throttle = (callBack: (arg: any) => void, delay = 100) => {
  let awaiting = false;

  return (arg: any) => {
    if (awaiting) return;

    callBack(arg);
    awaiting = true;
    setTimeout(() => {
      awaiting = false;
    }, delay);
  };
};
