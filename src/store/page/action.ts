import InferValueTypes from "@/types/InferValueTypes";
import {SET_PAGE} from "@/store/actions";
import {PAGES} from "@my-app/constants";


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

