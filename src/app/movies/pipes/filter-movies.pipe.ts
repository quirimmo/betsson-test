import { Pipe, PipeTransform } from '@angular/core';
import Movie from '../movie.model';
import GenreType from '../genre.model';

@Pipe({ name: 'filterMovies' })
export class FilterMoviesPipe implements PipeTransform {
	transform(movies: Movie[], name: string, genres: string[] = []): Movie[] {
		genres = genres.map((g: string) => GenreType[g]);
		return movies.filter((m: Movie) => {
			return (
				m.name.toUpperCase().includes(name.trim().toUpperCase()) &&
				m.genres.some((g: GenreType) => genres.includes(g))
			);
		});
	}
}
