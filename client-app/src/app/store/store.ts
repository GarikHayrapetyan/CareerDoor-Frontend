import { createContext, useContext } from 'react';
import CommentStore from './commentStore';
import CommonStore from './commonStore';
import GetTogetherStore from './getTogetherStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import UserStore from './userStore';

interface Store {
	getTogetherStore: GetTogetherStore;
	commonStore: CommonStore;
	userStore: UserStore;
	modalStore: ModalStore;
	profileStore: ProfileStore;
	commentStore: CommentStore;
}

export const store: Store = {
	getTogetherStore: new GetTogetherStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	modalStore: new ModalStore(),
	profileStore: new ProfileStore(),
	commentStore: new CommentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
