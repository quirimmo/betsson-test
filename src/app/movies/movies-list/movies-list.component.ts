import { Component, Input, OnInit } from '@angular/core';
import Movie from '../movie.model';
import { FormControl } from '@angular/forms';
import GenreType from '../genre.model';

@Component({
	selector: 'movies-list',
	inputs: ['movies'],
	styleUrls: ['./movies-list.component.scss'],
	templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit {
	@Input()
	movies: Movie[];
	genres: string[] = Object.keys(GenreType);

	toppings = new FormControl();
	toppingList: string[] = [
		'Extra cheese',
		'Mushroom',
		'Onion',
		'Pepperoni',
		'Sausage',
		'Tomato'
	];

	constructor() {}

	ngOnInit(): void {
		console.log('movies in the comp:', this.movies);
		this.toppings.setValue(this.genres);
	}

	trackById(index: number, item: Movie): number {
		return item.id;
	}
}
