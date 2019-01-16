import { Component, Input, OnInit } from '@angular/core';
import Movie from '../movie.model';

@Component({
	selector: 'movie-list-item',
	inputs: ['movie'],
	styleUrls: ['./movie-list-item.component.scss'],
	templateUrl: './movie-list-item.component.html'
})
export class MovieListItemComponent {
	@Input()
	movie: Movie;

	constructor() {}
}
