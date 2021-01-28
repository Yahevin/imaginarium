import { useEffect, useState } from 'react';
import deal from '@/helpers/deal';
import { InferArgumentsType } from '@my-app/types';

type TDealProps = InferArgumentsType<typeof deal>;

const useFetch = <S>(props: TDealProps, initial: S) => {
  const [result, setResult] = useState(initial);

  useEffect(() => {
    (async () => {
      try {
        const fetched = await deal(props);

        setResult(fetched);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props]);

  return result;
};

export default useFetch;
