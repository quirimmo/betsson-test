import { Component, OnInit } from '@angular/core';
import { AppLoaderActions } from '../../app-loader/app-loader.actions';
import Movie from 'src/app/movies/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'home-page',
	templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
	movies: Movie[] = [];

	constructor(
		private appLoaderActions: AppLoaderActions,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.movies = this.route.snapshot.data.movies;
		this.appLoaderActions.stopLoading();
	}
}
