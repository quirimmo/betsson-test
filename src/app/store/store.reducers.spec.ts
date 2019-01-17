const mockComposeReducers = jest.fn(() => {});
const mockedDefaultFormReducerValue = {};
const mockDefaultFormReducer = jest
	.fn()
	.mockReturnValue(mockedDefaultFormReducerValue);
jest.mock('@angular-redux/form', () => ({
	composeReducers: mockComposeReducers,
	defaultFormReducer: mockDefaultFormReducer
}));
const mockedDefaultCombineReducersValue = {};
const mockCombineReducers = jest
	.fn()
	.mockReturnValue(mockedDefaultCombineReducersValue);
jest.mock('redux', () => ({
	combineReducers: mockCombineReducers
}));
import { StoreReducer } from './store.reducers';
import { moviesReducer } from '../movies/movies.reducer';
import { appLoaderReducer } from '../app-loader/app-loader.reducer';

describe('Store Reducers', () => {
	beforeEach(() => {
		console.log(StoreReducer);
	});

	it('should call the composeReducers method', () => {
		expect(mockComposeReducers).toHaveBeenCalledWith(
			mockedDefaultFormReducerValue,
			mockedDefaultCombineReducersValue
		);
	});

	it('should call the defaultFormReducer method', () => {
		expect(mockDefaultFormReducer).toHaveBeenCalledWith();
	});

	it('should call the combineReducers method', () => {
		expect(mockCombineReducers).toHaveBeenCalledWith({
			movies: moviesReducer,
			isLoading: appLoaderReducer
		});
	});
});
