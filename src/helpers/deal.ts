import store from '@/store';

type Imagick = (props: { url: string; method?: 'POST' | 'GET' | 'PUT' | 'DELETE'; body?: any }) => any;

const deal: Imagick = async ({ url, method = 'POST', body = {} }) => {
  const { room_id } = store.getState().partyReducer;
  const { user_id } = store.getState().userReducer;
  body = { user_id, room_id, ...body };
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const data = {
    method,
    headers: myHeaders,
    body: JSON.stringify(body),
  };

  return await fetch(url, data).then(async (response) => {
    const { success, error, ...rest } = await response.json();

    if (success) {
      return rest;
    }
    throw error;
  });
};

export default deal;
