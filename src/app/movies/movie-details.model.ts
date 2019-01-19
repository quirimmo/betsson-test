import { MovieVideo } from './movie-video.model';

export interface MovieDetails {
	budget: number;
	homepage: string;
	overview: string;
	releaseDate: Date;
	revenue: number;
	videos: MovieVideo[];
}
