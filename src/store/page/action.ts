import InferValueTypes from "@/helpers/InferValueTypes";
import {SET_PAGE} from "@/store/actions";
import PAGES from "@/constants/Pages";


const PageAction = {
    set: function(page: PAGES) {
        return {
            type: SET_PAGE,
            payload: page,
        }
    },
};

type PageActionTypes = ReturnType<InferValueTypes<typeof PageAction>>;


export {PageAction, PageActionTypes};

