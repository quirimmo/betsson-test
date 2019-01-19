import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppLoaderActions } from '../../app-loader/app-loader.actions';
import Movie from 'src/app/movies/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'home-page',
	templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, AfterViewInit {
	movies: Movie[] = [];

	constructor(
		private appLoaderActions: AppLoaderActions,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		console.log('resolved data:', this.route.snapshot.data.movies);
		this.movies = this.route.snapshot.data.movies;
	}

	ngAfterViewInit(): void {
		this.appLoaderActions.stopLoading();
	}
}
