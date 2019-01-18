import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderActions } from '../../app-loader/app-loader.actions';
import Movie from 'src/app/movies/movie.model';

@Component({
	selector: 'view-movie-page',
	inputs: [],
	outputs: [],
	templateUrl: './view-movie-page.component.html'
})
export class ViewMoviePageComponent implements OnInit, AfterViewInit {
	movie: Movie;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private appLoaderActions: AppLoaderActions
	) {}

	ngOnInit(): void {
		this.movie = this.route.snapshot.data.movie;
		if (!this.movie) {
			this.router.navigate(['']);
		}
	}

	ngAfterViewInit(): void {
		this.appLoaderActions.stopLoading();
	}
}
