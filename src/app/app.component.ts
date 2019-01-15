import { Component, OnInit } from '@angular/core';
import { MoviesDAOService } from './movies/movies.dao';
import { MoviesActions } from './movies/movies.actions';
import { AppActions } from './app.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'betsoon-test';

	@select(['isLoading'])
	readonly isLoading$: Observable<boolean>;

	constructor(
		private moviesActions: MoviesActions,
		private appActions: AppActions
	) {}

	public ngOnInit(): void {
		const subscription = this.moviesActions
			.dispatchFetchMoviesThunk()
			.subscribe(onSuccess.bind(this), onError, onFinally);

		function onSuccess() {
			this.appActions.stopLoading();
		}

		function onError(err: any) {
			console.log('Errror fetching the movies', err);
		}

		function onFinally() {
			subscription.unsubscribe();
		}
	}
}
