import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import GetTogether from '../models/GetTogether';

export default class GetTogetherStore {
	getTogetherRegistry = new Map<string, GetTogether>();
	selectedGetTogether: GetTogether | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get getTogethersByDate() {
		return Array.from(this.getTogetherRegistry.values()).sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		);
	}

	get groupedGetTogethers() {
		return Object.entries(
			this.getTogethersByDate.reduce(
				(getTogethers, getTogether) => {
					const date = getTogether.date;
					getTogethers[date] = getTogethers[date]
						? [ ...getTogethers[date], getTogether ]
						: [ getTogether ];
					return getTogethers;
				},
				{} as { [key: string]: GetTogether[] }
			)
		);
	}

	loadingGetTogethers = async () => {
		try {
			const getTogethers = await agent.GetTogethers.list;
			getTogethers.forEach((getTogether) =>
				this.setGetTogether(getTogether)
			);
		} catch (error) {
			console.log(error);
		}
	};

	loadGetTogether = async (id: string) => {
		let getTogether = this.getGetTogether(id);
		if (getTogether) {
			this.selectedGetTogether = getTogether;
		} else {
			try {
				getTogether = await agent.GetTogethers.details(id);
				this.setGetTogether(getTogether);
				this.selectedGetTogether = getTogether;
			} catch (error) {
				console.log(error);
			}
		}
	};

	private getGetTogether = (id: string) => {
		return this.getTogetherRegistry.get(id);
	};

	private setGetTogether(getTogether: GetTogether) {
		getTogether.date = getTogether.date.split('T')[0];
		this.getTogetherRegistry.set(getTogether.id, getTogether);
	}
}
