import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { moviesReducer } from '../movies/movies.reducer';

export const StoreReducer = composeReducers(
	defaultFormReducer(),
	combineReducers({
		movies: moviesReducer
	})
);
