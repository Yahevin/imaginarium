import { SET_PAGE } from '@/store/actions';
import pageState from '@/store/page/state';
import { PageActionTypes } from '@/store/page/action';
import IPageState from '@/store/page/IPageState';

function pageReducer(state = pageState, action: PageActionTypes): IPageState {
  switch (action.type) {
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default pageReducer;
