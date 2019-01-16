import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { moviesReducer } from '../movies/movies.reducer';
import { appLoaderReducer } from '../app-loader/app-loader.reducer';

export const StoreReducer = composeReducers(
	defaultFormReducer(),
	combineReducers({
		movies: moviesReducer,
		isLoading: appLoaderReducer
	})
);
