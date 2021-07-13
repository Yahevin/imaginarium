export const scrollToNewMessage = () => {
  const elements = document.querySelectorAll('#messages_field [data-id="message"]') as NodeListOf<HTMLDivElement>;
  if (elements.length === 0) return;
  const { offsetTop } = elements[elements.length - 1];

  document.getElementById('messages_scroll')?.scrollTo(0, offsetTop);
};
