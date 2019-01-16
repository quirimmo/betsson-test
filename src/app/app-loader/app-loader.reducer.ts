import { AppLoaderAction, AppLoaderActions } from './app-loader.actions';

export function appLoaderReducer(
	state: boolean = false,
	action: AppLoaderAction
): boolean {
	switch (action.type) {
		case AppLoaderActions.START_LOADING:
			return action.isLoading;
		case AppLoaderActions.STOP_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}
