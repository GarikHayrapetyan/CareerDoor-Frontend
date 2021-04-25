import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import GetTogetherStore from './getTogetherStore';

interface Store {
	getTogetherStore: GetTogetherStore;
	commonStore: CommonStore;
}

export const store: Store = {
	getTogetherStore: new GetTogetherStore(),
	commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
