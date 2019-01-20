import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class MoviesRouterService {
	moviesListRouteParams: {
		genres: null;
		name: null;
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

	public appendQueryParam(paramName: string, paramValue: any): void {
		this.moviesListRouteParams = {
			...this.moviesListRouteParams,
			[paramName]: paramValue
		};
		this.router.navigate([], {
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
