import Movie from '../movies/movie.model';

export interface StoreModel {
	movies?: Movie[];
	isLoading?: boolean;
}
