import { Pipe, PipeTransform } from '@angular/core';
import Movie from '../movie.model';

export interface SortingValues {
	value: string;
	isAscending: boolean;
}

@Pipe({ name: 'sortMovies' })
export class SortMoviesPipe implements PipeTransform {
	transform(
		movies: Movie[],
		{ value, isAscending }: SortingValues = {
			value: 'id',
			isAscending: true
		}
	): Movie[] {
		let sorter: (a: Movie, b: Movie) => number;
		switch (value) {
			case 'id':
				sorter = this.sortById(isAscending);
				break;
			case 'name':
				sorter = this.sortByName(isAscending);
				break;
			case 'rate':
				sorter = this.sortByRate(isAscending);
				break;
			case 'length':
				sorter = this.sortByDuration(isAscending);
				break;
			default:
				sorter = this.sortById(isAscending);
				break;
		}
		const newMovies: Movie[] = movies.slice();
		newMovies.sort(sorter);
		return newMovies;
	}

	sortById(isAscending: boolean): (a: Movie, b: Movie) => number {
		return isAscending
			? (a: Movie, b: Movie) => a.id - b.id
			: (a: Movie, b: Movie) => b.id - a.id;
	}

	sortByName(isAscending: boolean): (a: Movie, b: Movie) => number {
		return isAscending
			? (a: Movie, b: Movie) =>
					a.name.toLowerCase().localeCompare(b.name.toLowerCase())
			: (a: Movie, b: Movie) =>
					b.name.toLowerCase().localeCompare(a.name.toLowerCase());
	}

	sortByRate(isAscending: boolean): (a: Movie, b: Movie) => number {
		return isAscending
			? (a: Movie, b: Movie) => +a.rate - +b.rate
			: (a: Movie, b: Movie) => +b.rate - +a.rate;
	}

	sortByDuration(isAscending: boolean): (a: Movie, b: Movie) => number {
		const that: SortMoviesPipe = this;
		return function(a: Movie, b: Movie) {
			const [aHours, aMinutes] = that.getHoursAndMinutesFromDuration(a.length);
			const [bHours, bMinutes] = that.getHoursAndMinutesFromDuration(b.length);
			const hoursDifference = aHours - bHours;
			const minutesDifference = aMinutes - bMinutes;
			if (hoursDifference !== 0) {
				return isAscending ? hoursDifference : -hoursDifference;
			}
			return isAscending ? minutesDifference : -minutesDifference;
		};
	}

	getHoursAndMinutesFromDuration(duration: string): [number, number] {
		const [hours, minutes] = duration.match(/\d+/g);
		return [+hours, +minutes];
	}
}
