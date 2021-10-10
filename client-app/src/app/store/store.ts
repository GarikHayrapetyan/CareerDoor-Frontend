import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import GetTogetherStore from './getTogetherStore';
import ModalStore from './modalStore';
import UserStore from './userStore';

interface Store {
	getTogetherStore: GetTogetherStore;
	commonStore: CommonStore;
	userStore: UserStore;
	modalStore:ModalStore;
}

export const store: Store = {
	getTogetherStore: new GetTogetherStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	modalStore: new ModalStore()
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
