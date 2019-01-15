import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Action, Dispatch, AnyAction } from 'redux';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, share, publish } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../store/store.model';
import Movie from './movie.model';
import { MoviesDAOService } from './movies.dao';

export interface MoviesAction extends Action {
	movies?: Movie[];
}

@Injectable()
export class MoviesActions {
	static readonly FETCH_MOVIES = 'FETCH_MOVIES';

	constructor(
		private ngRedux: NgRedux<StoreModel>,
		private moviesDAO: MoviesDAOService
	) {}

	public dispatchFetchMoviesThunk(): Observable<MoviesAction> {
		return this.fetchMoviesThunk()(this.ngRedux.dispatch);
	}

	private fetchMoviesThunk(): (
		disp: Dispatch<AnyAction>
	) => Observable<MoviesAction> {
		return (disp: Dispatch<AnyAction>) =>
			this.fetchUsers().pipe(
				map((movies: Movie[]) => disp(this.fetchMoviesFulfilled(movies)))
			);
	}

	private fetchMoviesFulfilled(movies: Movie[]): MoviesAction {
		return {
			type: MoviesActions.FETCH_MOVIES,
			movies
		};
	}

	private fetchUsers(): Observable<Movie[]> {
		return this.moviesDAO.fetchMovies();
	}

	// // FETCH
	// // ==============================

	// public dispatchFetchUsersThunk(): Observable<UserAction> {
	// 	return this.fetchUsersThunk()(this.ngRedux.dispatch);
	// }

	// private fetchUsersThunk(): (
	// 	disp: Dispatch<AnyAction>
	// ) => Observable<UserAction> {
	// 	return (disp: Dispatch<AnyAction>) =>
	// 		this.fetchUsers().pipe(
	// 			map((users: User[]) => disp(this.fetchUsersFulfilled(users)))
	// 		);
	// }

	// private fetchUsersFulfilled(users: User[]): UserAction {
	// 	return {
	// 		type: UserActions.FETCH_USERS,
	// 		users
	// 	};
	// }

	// private fetchUsers(): Observable<User[]> {
	// 	return this.usersDAOService.fetchUsers();
	// }

	// // REMOVE
	// // ==============================

	// public dispatchRemoveUserThunk(user: User): Observable<UserAction> {
	// 	return this.removeUserThunk(user)(this.ngRedux.dispatch);
	// }

	// private removeUserThunk(
	// 	user: User
	// ): (disp: Dispatch<AnyAction>) => Observable<UserAction> {
	// 	return (disp: Dispatch<AnyAction>) =>
	// 		this.removeUser(user).pipe(
	// 			map((removedUsers: number) => disp(this.removeUserFulfilled([user])))
	// 		);
	// }

	// private removeUserFulfilled(users: User[]): UserAction {
	// 	return {
	// 		type: UserActions.REMOVE_USER,
	// 		users
	// 	};
	// }

	// private removeUser(user: User): Observable<number> {
	// 	return this.usersDAOService.removeUser(user);
	// }

	// // ADD
	// // ==============================

	// public dispatchAddUserThunk(user: User): Observable<UserAction> {
	// 	return this.addUserThunk(user)(this.ngRedux.dispatch);
	// }

	// private addUserThunk(
	// 	user: User
	// ): (disp: Dispatch<AnyAction>) => Observable<UserAction> {
	// 	return (disp: Dispatch<AnyAction>) =>
	// 		this.addUser(user).pipe(
	// 			map((users: User[]) => disp(this.addUserFulfilled(users)))
	// 		);
	// }

	// private addUserFulfilled(users: User[]): UserAction {
	// 	return {
	// 		type: UserActions.ADD_USER,
	// 		users
	// 	};
	// }

	// private addUser(user: User): Observable<User[]> {
	// 	return this.usersDAOService.addUser(user);
	// }

	// // UPDATE
	// // ==============================

	// public dispatchUpdateUserThunk(user: User): Observable<UserAction> {
	// 	return this.updateUserThunk(user)(this.ngRedux.dispatch);
	// }

	// private updateUserThunk(
	// 	user: User
	// ): (disp: Dispatch<AnyAction>) => Observable<UserAction> {
	// 	return (disp: Dispatch<AnyAction>) =>
	// 		this.updateUser(user).pipe(
	// 			map((updateUsers: number) => disp(this.updateUserFulfilled([user])))
	// 		);
	// }

	// private updateUserFulfilled(users: User[]): UserAction {
	// 	return {
	// 		type: UserActions.UPDATE_USER,
	// 		users
	// 	};
	// }

	// private updateUser(user: User): Observable<number> {
	// 	return this.usersDAOService.updateUser(user);
	// }
}