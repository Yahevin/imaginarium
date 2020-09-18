import React, {useCallback, useMemo, useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputHandler from "@/interfaces/InputHandler";
import ButtonTheme from "@/constants/ButtonTheme";
import deal from "@/helpers/deal";
import {PartyAction} from "@/store/party/action";
import GAME_ACTION from "@/constants/GAME_ACTION";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "@/store/reducer";

function QuestInput() {
    const dispatch = useDispatch();
    const room_id = useSelector((store: TStore) => store.partyReducer.room_id);
    const selected = useSelector((store: TStore) => store.cardsReducer.selected);

    const selectDone = useMemo(() => selected !== null, [selected]);


    const [question, setQuestion] = useState('');
    const inputHandler: InputHandler = useCallback((event) => {
        setQuestion(event.target.value);
    }, []);

    const submit_disabled = useMemo(() => {
        return question.length > 0 && selectDone !== null;
    }, [question, selectDone]);

    const submit_theme = useMemo(() => {
        return submit_disabled
            ? ButtonTheme.red
            : ButtonTheme.green;
    }, [submit_disabled]);

    const quest_submit = useCallback(async () => {
        try {
            await deal({
                url: '/set-question',
                method: 'POST',
                body: {room_id, question, card_id: selected}
            });

            dispatch(PartyAction.setQuestion(question));
            dispatch(PartyAction.setGAction(GAME_ACTION.gmCardSet));
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
            <Button callback={quest_submit}
                    disabled={submit_disabled}
                    theme={submit_theme}
                    size={"auto"}>
                Submit
            </Button>
        </>
    )
}

export default QuestInput;
