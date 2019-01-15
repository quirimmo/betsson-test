import { Component, Input, OnInit } from '@angular/core';
import Movie from '../movie.model';

@Component({
	selector: 'movies-list',
	inputs: ['movies'],
	styleUrls: ['./movies-list.component.scss'],
	templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit {
	@Input()
	movies: Movie[];

	constructor() {}

	ngOnInit(): void {
		console.log('movies in the comp:', this.movies);
	}
}
