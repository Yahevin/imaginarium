import IPageState from "@/interfaces/IPageState";
import IUserState from "@/interfaces/IUserState";

interface IStore {
    pageReducer: IPageState,
    userReducer: IUserState,
}

export default IStore;
