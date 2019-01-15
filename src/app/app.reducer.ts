import { AppActions } from './app.actions';
import { Action } from 'redux';

export function appReducer(state: boolean = false, action: Action): boolean {
	switch (action.type) {
		case AppActions.START_LOADING:
			return true;
		case AppActions.STOP_LOADING:
			return false;
		default:
			return state;
	}
}
