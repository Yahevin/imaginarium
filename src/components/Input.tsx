import React from "react";
import styled from "styled-components";
import {COLOR} from "@my-app/constants";
import {InputHandler} from "@my-app/interfaces";

const StyledInput = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 6px 10px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 2px solid ${COLOR.slate};
    color: ${COLOR.slate};
    background: ${COLOR.white};
`;

interface IProps {
    type: 'text' | 'password',
    name: string,
    default: string,
    placeholder: string,
    className?: string,
    onChange: InputHandler;
}

function Input(props: IProps) {
    return (
        <StyledInput type={props.type}
                     name={props.name}
                     className={props.className}
                     placeholder={props.placeholder}
                     defaultValue={props.default}
                     onChange={props.onChange}/>
    )
}

export default Input;
