import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class MoviesRouterService {
	moviesListRouteParams: {
		genres: null;
		name: null;
		sortBy: null;
		isAscending: null;
	};

	constructor(private route: ActivatedRoute, private router: Router) {}

	public appendSearchNameParam(searchName: string): void {
		const searchNameParam = searchName || null;
		this.appendQueryParam('name', searchNameParam);
	}

	public getSearchNameParam(): string {
		return this.route.snapshot.queryParams.name;
	}

	public appendSearchGenresParam(searchGenres: string[]): void {
		const searchGenresParam =
			Array.isArray(searchGenres) && searchGenres.length ? searchGenres : null;
		this.appendQueryParam('genres', searchGenresParam);
	}

	public getSearchGenresParam(): string[] {
		if (!this.route.snapshot.queryParams.genres) {
			return [];
		}
		if (typeof this.route.snapshot.queryParams.genres === 'string') {
			return [this.route.snapshot.queryParams.genres];
		}
		if (Array.isArray(this.route.snapshot.queryParams.genres)) {
			return this.route.snapshot.queryParams.genres;
		}
	}

	public getSortByParam(): { sortBy: string; isAscending: boolean } {
		const sortBy: string = this.route.snapshot.queryParams.sortBy || null;
		const isAscending: boolean =
			typeof this.route.snapshot.queryParams.isAscending === 'undefined'
				? null
				: this.route.snapshot.queryParams.isAscending;
		return { sortBy, isAscending };
	}

	public appendSortByParam(value: string, isAscending: boolean): void {
		const sortByValueParam = value || null;
		const sortByIsAscendingParam =
			typeof isAscending === 'undefined' ? null : isAscending;

		this.appendQueryParam('sortBy', sortByValueParam).then(() =>
			this.appendQueryParam('isAscending', sortByIsAscendingParam)
		);
	}

	public appendQueryParam(
		paramName: string,
		paramValue: any
	): Promise<boolean> {
		this.moviesListRouteParams = {
			...this.moviesListRouteParams,
			[paramName]: paramValue
		};
		return this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {
				[paramName]: paramValue
			},
			queryParamsHandling: 'merge'
		});
	}

	public navigateBackToMoviesList() {
		this.router.navigate([''], {
			queryParams: { ...this.moviesListRouteParams }
		});
	}
}
