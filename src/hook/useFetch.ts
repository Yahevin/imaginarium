import { useEffect, useRef, useState } from 'react';
import deal, { InferBodyType } from '@/helpers/deal';
import { InferResultType } from '@imaginarium/packages/types';

type TUseFetch = <S>(
  props: {
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  } & InferBodyType<S>,
  initial: InferResultType<S>,
) => InferResultType<S>;

export const useFetch: TUseFetch = (props, initial) => {
  const [result, setResult] = useState(initial);
  const memoized = useRef<any>(null);
  const body = props.body as any;

  useEffect(() => {
    const propsChanged = memoized.current
      ? Object.keys(memoized.current).reduce((accum, item) => {
          return accum || memoized.current[item] !== body[item];
        }, false)
      : true;

    if (propsChanged) {
      memoized.current = { ...body };
      (async () => {
        try {
          const fetched = await deal(props);
          setResult(fetched);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [props]);

  return result;
};
