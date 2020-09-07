import React, { useEffect} from "react";
import { useHistory } from "react-router-dom";


function IndexPage() {
    const history = useHistory();

    useEffect(()=>{
        const hash = window.location.hash;
        if (hash.length === 0) return;
        history.push(hash.replace(/#/,''));
    });

    return (
        <>
            <h1>Hello world</h1>
        </>
    )
}


export default  IndexPage;
