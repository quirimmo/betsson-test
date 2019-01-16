import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'filter-movies',
	inputs: ['genres'],
	styleUrls: ['./filter-movies.component.scss'],
	templateUrl: './filter-movies.component.html'
})
export class FilterMoviesComponent implements OnInit {
	@Input()
	genres: string[];
	genresSelect = new FormControl();
	nameText = new FormControl();

	constructor() {}

	ngOnInit(): void {
		this.nameText.setValue('');
		this.genresSelect.setValue(this.genres);
	}
}
