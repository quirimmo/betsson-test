import { TestBed } from '@angular/core/testing';
import { NgRedux } from '@angular-redux/store';
import { AppLoaderActions } from './app-loader.actions';

const mockDispatch = jest.fn();
const mockNgRedux = {
	provide: NgRedux,
	useValue: {
		dispatch: mockDispatch
	}
};
const providers = [mockNgRedux, AppLoaderActions];

describe('AppLoaderActions Service', () => {
	let service;
	beforeEach(() => {
		jest.useFakeTimers();
		TestBed.configureTestingModule({
			providers
		});
		service = TestBed.get(AppLoaderActions);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('Action Types', () => {
		it('should define the START_LOADING action type', () => {
			expect(AppLoaderActions.START_LOADING).toEqual('START_LOADING');
		});

		it('should define the STOP_LOADING action type', () => {
			expect(AppLoaderActions.STOP_LOADING).toEqual('STOP_LOADING');
		});
	});

	describe('startLoading', () => {
		it('should dispatch the action to redux', () => {
			service.startLoading();
			expect(mockDispatch).toHaveBeenCalledWith({
				type: AppLoaderActions.START_LOADING,
				isLoading: true
			});
		});
	});

	describe('stopLoading', () => {
		it('should dispatch the action to redux', () => {
			service.stopLoading();
			expect(mockDispatch).toHaveBeenCalledWith({
				type: AppLoaderActions.STOP_LOADING,
				isLoading: false
			});
		});
	});
});
