import { Component } from '@angular/core';
import { MoviesRouterService } from '../movies/movies-router.service';

@Component({
	selector: 'app-navigator-link',
	templateUrl: './app-navigator-link.component.html',
	styleUrls: ['./app-navigator-link.component.scss']
})
export class AppNavigatorLinkComponent {
	constructor(private moviesRouterService: MoviesRouterService) {}

	public navigateBackToMoviesList(): void {
		this.moviesRouterService.navigateBackToMoviesList();
	}
}
