import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import GetTogetherStore from './getTogetherStore';
import UserStore from './userStore';

interface Store {
	getTogetherStore: GetTogetherStore;
	commonStore: CommonStore;
	userStore: UserStore;
}

export const store: Store = {
	getTogetherStore: new GetTogetherStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore()
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
