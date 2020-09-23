import React, {useCallback, useMemo, useState} from "react";
import Input from "@/components/Input";
import InputHandler from "@/interfaces/InputHandler";
import deal from "@/helpers/deal";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";
import SocketAction from "@/web-socket/action";
import {CardsAction} from "@/store/cards/action";
import Submit from "@/components/Submit";

function QuestInput() {
    const dispatch = useDispatch();
    const selected = useSelector((store: TStore) => store.cardsReducer.selected);

    const selectDone = useMemo(() => selected !== null, [selected]);


    const [question, setQuestion] = useState('');
    const inputHandler: InputHandler = useCallback((event) => {
        setQuestion(event.target.value);
    }, []);

    const submit_disabled = useMemo(() => {
        return question.length > 0 && selectDone !== null;
    }, [question, selectDone]);

    const quest_submit = useCallback(async () => {
        try {
            await deal({
                url: '/set-question',
                body: {question, card_id: selected}
            });

            // remove selected card from hand
            dispatch(CardsAction.putToTable(selected));

            // after this action, will come command
            // to update game_action and question
            SocketAction.startGuess(question);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <Input type={"text"}
                   name={"question"}
                   default={question}
                   placeholder={'Ассоциация'}
                   onChange={inputHandler}/>
            <Submit callback={quest_submit}
                    disabled={submit_disabled}
                    size={"auto"}>
                Submit
            </Submit>
        </>
    )
}

export default QuestInput;
