import React, {useCallback} from "react";
import {BUTTON_THEME, PAGES} from "@my-app/constants";
import Button from "@/components/Button";
import {PageAction} from "@/store/page/action";
import {useDispatch} from "react-redux";


function StartPage() {
    const dispatch = useDispatch();


    const startHandler = useCallback(() => {
        dispatch(PageAction.set(PAGES.AUTH));
    }, []);

    return (
        <Button callback={startHandler}
                theme={BUTTON_THEME.green}
                size={'auto'}>
            Start
        </Button>
    )
}

export default StartPage;
