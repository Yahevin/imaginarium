import { InferArgumentsType, InferResultType } from '@imaginarium/packages/types';

export type InferBodyType<U> = InferArgumentsType<U> extends never ? { body?: {} } : { body: InferArgumentsType<U> };

type TDeal = <U>(
  props: {
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  } & InferBodyType<U>,
) => Promise<InferResultType<U>>;

const deal: TDeal = async ({ url, method = 'POST', body = {} }) => {
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
