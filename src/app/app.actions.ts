import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from './store/store.model';

@Injectable()
export class AppActions {
	static readonly START_LOADING = 'START_LOADING';
	static readonly STOP_LOADING = 'STOP_LOADING';

	constructor(private ngRedux: NgRedux<StoreModel>) {}

	public startLoading(): Action {
		return this.ngRedux.dispatch({
			type: AppActions.START_LOADING
		});
	}

	public stopLoading(): Action {
		return this.ngRedux.dispatch({
			type: AppActions.STOP_LOADING
		});
	}
}
