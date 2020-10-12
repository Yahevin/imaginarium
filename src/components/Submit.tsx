import React, {useMemo} from "react";
import Button from "@/components/Button";
import {BUTTON_THEME} from "@my-app/constants";
import {IButton} from "interfaces";


interface ISubmit extends Omit<IButton, 'theme'>{
    disabled: boolean,
}

function Submit(props: ISubmit) {
    const theme = useMemo(() => {
        return props.disabled
            ? BUTTON_THEME.red
            : BUTTON_THEME.green;
    }, [props.disabled]);

    return (
        <Button disabled={props.disabled}
                theme={theme}
                size={props.size}
                callback={props.callback}>
            {props.children}
        </Button>
    )
}

export default Submit;
