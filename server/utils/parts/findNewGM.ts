export const findNewGM = (id_list: number[], gm_id: number) => {
  let current = 0;
  id_list.forEach((item, index) => {
    if (item === gm_id) {
      current = index;
    }
  });
  if (current < id_list.length - 1) {
    return id_list[current + 1];
  }
  return id_list[0];
};
