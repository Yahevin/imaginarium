import { InferValueTypes } from '@my-app/types';
import { SET_PAGE } from '@/store/actions';
import { T_PAGES } from '@my-app/constants';

const PageAction = {
  set(page: T_PAGES) {
    return {
      type: SET_PAGE,
      payload: page,
    };
  },
};

type PageActionTypes = ReturnType<InferValueTypes<typeof PageAction>>;

export { PageAction, PageActionTypes };
