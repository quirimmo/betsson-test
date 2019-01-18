import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortingValues } from '../pipes/sort-movies.pipe';

interface MovieSortingValues extends SortingValues {
	label: string;
}

@Component({
	selector: 'sort-movies',
	inputs: [],
	styleUrls: ['./sort-movies.component.scss'],
	templateUrl: './sort-movies.component.html'
})
export class SortMoviesComponent implements OnInit {
	sortBySelect = new FormControl();

	orderingOptions: MovieSortingValues[] = [
		{ value: 'id', isAscending: true, label: 'Default (Ascending)' },
		{ value: 'id', isAscending: false, label: 'Default (Descending)' },
		{ value: 'name', isAscending: true, label: 'Name (Ascending)' },
		{ value: 'name', isAscending: false, label: 'Name (Descending)' },
		{ value: 'rate', isAscending: true, label: 'Rate (Ascending)' },
		{ value: 'rate', isAscending: false, label: 'Rate (Descending)' },
		{ value: 'length', isAscending: true, label: 'Duration (Ascending)' },
		{ value: 'length', isAscending: false, label: 'Duration (Descending)' }
	];

	constructor() {}

	ngOnInit(): void {
		this.sortBySelect.setValue(this.orderingOptions[0]);
	}
}
