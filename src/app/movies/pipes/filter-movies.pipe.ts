import { Pipe, PipeTransform } from '@angular/core';
import Movie from '../movie.model';
import GenreType from '../genre.model';

@Pipe({ name: 'filterMovies' })
export class FilterMoviesPipe implements PipeTransform {
	transform(movies: Movie[], name: string, genres: string[] = []): Movie[] {
		genres = genres.map(g => GenreType[g]);
		return movies.filter(m => {
			return (
				m.name.toUpperCase().includes(name.trim().toUpperCase()) &&
				m.genres.some(g => genres.includes(g))
			);
		});
	}
}
