import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MoviesActions } from './movies/movies.actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import Movie from './movies/movie.model';
import { AppLoaderActions } from './app-loader/app-loader.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'betsoon-test';

	constructor(
		private moviesActions: MoviesActions,
		private appActions: AppLoaderActions
	) {}

	public ngOnInit(): void {}
}
