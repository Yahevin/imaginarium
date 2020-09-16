import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import deal from "@/helpers/deal";
import {TStore} from "@/store/reducer";
import IPlayer from "@/interfaces/IPlayer";

function usePlayersList(): [IPlayer[], () => Promise<void>] {
    const [players, setPlayers]: [IPlayer[], (arg: IPlayer[]) => void] = useState([]);
    const room_id = useSelector((store: TStore) => store.partyReducer.room_id);

    const updatePlayers = useCallback(async () => {
        try {
            const {List} = await deal({
                url: '/get-players',
                method: "POST",
                body: {room_id},
            });

            setPlayers(List);
        } catch (e) {
            console.log(e);
        }
    }, [room_id]);

    useEffect(() => {
        updatePlayers();

        const timer = setInterval(async () => {
            await updatePlayers();
        }, 4000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return [players, updatePlayers];
}

export default usePlayersList;
