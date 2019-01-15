import { Component } from '@angular/core';
import { MoviesDAOService } from './movies/movies.dao';
import { MoviesActions } from './movies/movies.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'betsoon-test';

	constructor(private actions: MoviesActions) {
		this.actions
			.dispatchFetchMoviesThunk()
			.subscribe(data => console.log(data));
	}
}
