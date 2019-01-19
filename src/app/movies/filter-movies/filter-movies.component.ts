import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesRouterService } from '../movies-router.service';

@Component({
	selector: 'filter-movies',
	inputs: ['genres'],
	styleUrls: ['./filter-movies.component.scss'],
	templateUrl: './filter-movies.component.html'
})
export class FilterMoviesComponent implements OnInit, OnDestroy {
	@Input()
	genres: string[];
	genresSelect = new FormControl();
	nameText = new FormControl();
	nameTextChangesSubscriber: Subscription;
	genresChangesSubscriber: Subscription;

	constructor(
		private moviesRouterService: MoviesRouterService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const searchName: string =
			this.moviesRouterService.getSearchNameParam() || '';
		const searchGenres: string[] =
			this.moviesRouterService.getSearchGenresParam() || this.genres;

		this.nameTextChangesSubscriber = this.nameText.valueChanges.subscribe(
			this.onChangeSearchName.bind(this)
		);
		this.genresChangesSubscriber = this.genresSelect.valueChanges.subscribe(
			this.onChangeSearchGenres.bind(this)
		);

		this.nameText.setValue(searchName);
		this.genresSelect.setValue(searchGenres);
	}

	ngOnDestroy(): void {
		this.nameTextChangesSubscriber.unsubscribe();
		this.genresChangesSubscriber.unsubscribe();
	}

	public onChangeSearchName(): void {
		this.moviesRouterService.appendSearchNameParam(this.nameText.value);
	}

	public onChangeSearchGenres(): void {
		this.moviesRouterService.appendSearchGenresParam(this.genresSelect.value);
	}
}
