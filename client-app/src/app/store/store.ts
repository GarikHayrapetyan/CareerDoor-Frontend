import { createContext, useContext } from "react";
import GetTogetherStore from "./getTogetherStore";


interface Store{
    getTogetherStore:GetTogetherStore;
}

export const store:Store = {
    getTogetherStore : new GetTogetherStore()
}

export const StoreContext = createContext(store)


export function useStore(){
    return useContext(StoreContext)
}