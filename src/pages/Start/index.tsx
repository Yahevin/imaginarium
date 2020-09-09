import React, {useCallback} from "react";
import ButtonTheme from "@/constants/ButtonTheme";
import Button from "@/components/Button";
import {PageAction} from "@/store/page/action";
import PAGES from "@/constants/Pages";
import {useDispatch} from "react-redux";

function StartPage() {
    const dispatch = useDispatch();


    const startHandler = useCallback(() => {
        dispatch(PageAction.set(PAGES.AUTH));
    }, []);

    return (
        <Button callback={startHandler}
                theme={ButtonTheme.green}
                size={'auto'}>
            Start
        </Button>
    )
}

export default StartPage;
