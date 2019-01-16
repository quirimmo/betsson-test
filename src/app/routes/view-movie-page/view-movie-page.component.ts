import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderActions } from '../../app-loader/app-loader.actions';
import { Observable, of, combineLatest } from 'rxjs';
import { select } from '@angular-redux/store';
import Movie from 'src/app/movies/movie.model';

@Component({
	selector: 'view-movie-page',
	inputs: [],
	outputs: [],
	templateUrl: './view-movie-page.component.html'
})
export class ViewMoviePageComponent implements OnInit {
	movie: Movie;

	constructor(
		private route: ActivatedRoute,
		private appLoaderActions: AppLoaderActions
	) {}

	ngOnInit(): void {
		this.movie = this.route.snapshot.data.movie;
		this.appLoaderActions.stopLoading();
	}
}
