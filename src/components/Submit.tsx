import React, {useMemo} from "react";
import Button from "@/components/Button";
import ButtonTheme from "@/constants/ButtonTheme";
import {IButton} from "interfaces";


interface ISubmit extends Omit<IButton, 'theme'>{
    disabled: boolean,
}

function Submit(props: ISubmit) {
    const theme = useMemo(() => {
        return props.disabled
            ? ButtonTheme.red
            : ButtonTheme.green;
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
