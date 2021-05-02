import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import GetTogether from '../models/GetTogether';
import { format } from 'date-fns'

export default class GetTogetherStore {
	getTogetherRegistry = new Map<string, GetTogether>();
	selectedGetTogether: GetTogether | undefined = undefined;
	editMode = false;
    loading = false;
    loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get getTogethersByDate() {
		return Array.from(this.getTogetherRegistry.values()).sort(
			(a, b) => a.date!.getTime() - b.date!.getTime());
	}

	get groupedGetTogethers() {
		return Object.entries(
			this.getTogethersByDate.reduce((getTogethers, getTogether) => {
					const date = format(getTogether.date!, 'dd MMM yyyy');
					getTogethers[date] = getTogethers[date]
						? [ ...getTogethers[date], getTogether ]
						: [ getTogether ];
					return getTogethers;
				}, {} as { [key: string]: GetTogether[] }
			)
		);
	}

	loadingGetTogethers = async () => {
		this.loadingInitial = true;
		try {
			const getTogethers = await agent.GetTogethers.list;
			getTogethers.forEach((getTogether) =>
				this.setGetTogether(getTogether)
			);
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	loadGetTogether = async (id: string) => {
		let getTogether = this.getGetTogether(id);
		if (getTogether) {
			this.selectedGetTogether = getTogether;
			return getTogether;
		} else {
			this.loadingInitial = true;
			try {
				getTogether = await agent.GetTogethers.details(id);
				this.setGetTogether(getTogether);
				runInAction(() => {
					this.selectedGetTogether = getTogether;
				})
				this.setLoadingInitial(false);
				return getTogether;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private setGetTogether = (getTogether: GetTogether) => {
		getTogether.date = new Date(getTogether.date!);
		this.getTogetherRegistry.set(getTogether.id, getTogether);
	}

	private getGetTogether = (id: string) => {
		return this.getTogetherRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	}

	createGetTogether = async (getTogether: GetTogether) => {
		this.loading = true;
		try {
			await agent.GetTogethers.create(getTogether); 
			runInAction(() => {
                this.getTogetherRegistry.set(getTogether.id, getTogether);
                this.selectedGetTogether = getTogether;
                this.editMode = false;
                this.loading = false;
            });
		} catch (error) {
			console.log(error);
		}
	}

	updateGetTogether = async (getTogether: GetTogether) => {
        this.loading = true;
        try {
            await agent.GetTogethers.update(getTogether);
            runInAction(() => {
                this.getTogetherRegistry.set(getTogether.id, getTogether);
                this.selectedGetTogether = getTogether;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            try {
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        }
    };

	deleteGetTogether = async (id: string) => {
        this.loading = true;
        try {
            await agent.GetTogethers.delete(id);
            runInAction(() => {
                this.getTogetherRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
