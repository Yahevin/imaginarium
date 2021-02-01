import { useEffect, useRef, useState } from 'react';
import deal from '@/helpers/deal';
import { InferArgumentsType } from '@my-app/types';

type TUseFetch = <S>(props: InferArgumentsType<typeof deal>, initial: S) => S;

export const useFetch: TUseFetch = (props, initial) => {
  const [result, setResult] = useState(initial);
  const memoized = useRef<typeof props.body | null>(null);

  useEffect(() => {
    const propsChanged = memoized.current
      ? Object.keys(memoized.current).reduce((accum, item) => {
          return accum || memoized.current[item] !== props.body[item];
        }, false)
      : true;

    if (propsChanged) {
      memoized.current = { ...props?.body };
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
