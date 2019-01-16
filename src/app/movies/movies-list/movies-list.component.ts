import { Component, Input } from '@angular/core';
import Movie from '../movie.model';
import GenreType from '../genre.model';
import {
	bounceOutOnLeaveAnimation,
	bounceInUpOnEnterAnimation,
	slideInLeftOnEnterAnimation,
	slideOutRightOnLeaveAnimation
} from 'angular-animations';
import { FilterMoviesPipe } from '../pipes/filter-movies.pipe';

@Component({
	selector: 'movies-list',
	inputs: ['movies'],
	styleUrls: ['./movies-list.component.scss'],
	templateUrl: './movies-list.component.html',
	animations: [
		bounceInUpOnEnterAnimation({ duration: 500 }),
		bounceOutOnLeaveAnimation({ duration: 350 }),
		slideInLeftOnEnterAnimation({ duration: 100, delay: 350 }),
		slideOutRightOnLeaveAnimation({ duration: 100 })
	]
})
export class MoviesListComponent {
	@Input()
	movies: Movie[];

	genres: string[] = Object.keys(GenreType);

	constructor(private filterMoviesPipe: FilterMoviesPipe) {}

	trackById(index: number, item: Movie): number {
		return item.id;
	}

	getFilteredMovies(name: string, genres: string[]): Movie[] {
		return this.filterMoviesPipe.transform(this.movies, name, genres);
	}
}
