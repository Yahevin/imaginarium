import {useEffect, useState} from "react";
import deal from "@/helpers/deal";
import {InferArgumentsType} from "@my-app/types";

const useFetch = (props: InferArgumentsType<typeof deal>) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const fetched = await deal(props);

                setResult(fetched);
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    return result;
};

export default useFetch;
