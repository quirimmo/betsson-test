import { Component, Input, OnInit } from '@angular/core';
import Movie from '../movie.model';

@Component({
	selector: 'movie-list-item',
	inputs: ['movie'],
	styleUrls: ['./movie-list-item.component.scss'],
	templateUrl: './movie-list-item.component.html'
})
export class MovieListItemComponent implements OnInit {
	@Input()
	movie: Movie;

	constructor() {}

	ngOnInit(): void {
		console.log('movie in the movie list item component:', this.movie);
	}
}
