import { appLoaderReducer } from './app-loader.reducer';
import { AppLoaderActions } from './app-loader.actions';

const startLoadingAction = {
	type: AppLoaderActions.START_LOADING,
	isLoading: true
};
const stopLoadingAction = {
	type: AppLoaderActions.STOP_LOADING,
	isLoading: false
};
const notExistentAction = {
	type: 'NOT_EXISTENT',
	isLoading: true
};

describe('AppLoader Reducer', () => {
	it('should be defined', () => {
		expect(appLoaderReducer).toBeDefined();
	});

	it('should be a function', () => {
		expect(appLoaderReducer).toBeInstanceOf(Function);
	});

	it('should return the state', () => {
		expect(appLoaderReducer(false, notExistentAction)).toEqual(false);
	});

	it('should return the new state with true', () => {
		expect(appLoaderReducer(false, startLoadingAction)).toEqual(true);
	});

	it('should return the new state with false', () => {
		expect(appLoaderReducer(true, stopLoadingAction)).toEqual(false);
	});
});
