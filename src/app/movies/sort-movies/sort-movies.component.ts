import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortingValues } from '../pipes/sort-movies.pipe';
import { Subscription } from 'rxjs';
import { MoviesRouterService } from '../movies-router.service';

interface MovieSortingValues extends SortingValues {
	label: string;
}

@Component({
	selector: 'sort-movies',
	inputs: [],
	styleUrls: ['./sort-movies.component.scss'],
	templateUrl: './sort-movies.component.html'
})
export class SortMoviesComponent implements OnInit, OnDestroy {
	sortBySelect = new FormControl();
	sortBySelectChangesSubscriber: Subscription;

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

	constructor(private moviesRouterService: MoviesRouterService) {}

	ngOnInit(): void {
		const { sortBy, isAscending } = this.moviesRouterService.getSortByParam();
		const orderingOption =
			this.orderingOptions.find(
				o => o.value === sortBy && o.isAscending === isAscending
			) || this.orderingOptions[0];

		this.sortBySelectChangesSubscriber = this.sortBySelect.valueChanges.subscribe(
			this.onChangeSortBy.bind(this)
		);
		this.sortBySelect.setValue(orderingOption);
	}

	public onChangeSortBy(): void {
		this.moviesRouterService.appendSortByParam(
			this.sortBySelect.value.value,
			this.sortBySelect.value.isAscending
		);
	}

	ngOnDestroy(): void {
		if (this.sortBySelectChangesSubscriber) {
			this.sortBySelectChangesSubscriber.unsubscribe();
		}
	}
}
