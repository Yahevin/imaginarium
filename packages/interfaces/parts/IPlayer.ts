import IPerson from "@/interfaces/IPerson";

interface IPlayer extends IPerson{
    score: number
    game_master: boolean
}

export default IPlayer;
