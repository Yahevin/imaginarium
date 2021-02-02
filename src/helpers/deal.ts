import store from '@/store';

type Imagick = <U>(props: { url: string; method?: 'POST' | 'GET' | 'PUT' | 'DELETE'; body?: any }) => Promise<U>;

const deal: Imagick = async ({ url, method = 'POST', body = {} }) => {
  const { room_id } = store.getState().partyReducer;
  const { user_id } = store.getState().userReducer;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const data = {
    method,
    headers: myHeaders,
    body: JSON.stringify({ ...body, user_id, room_id }),
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
