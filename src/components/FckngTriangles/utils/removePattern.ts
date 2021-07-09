export const removePattern = (nodes: (HTMLDivElement | undefined)[]) => {
  nodes.forEach((node) => {
    if (node) {
      node.classList.remove('hovered-a', 'hovered-b');
    }
  });
};
