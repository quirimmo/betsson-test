import { ViewMoviePageComponent } from './routes/view-movie-page/view-movie-page.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { MoviesResolver } from './resolvers/movies.resolver';
import { MovieResolver } from './resolvers/movie.resolver';

export const AppRoutes = [
	{
		path: '',
		component: HomePageComponent,
		resolve: {
			movies: MoviesResolver
		}
	},
	{
		path: 'movie/:id',
		component: ViewMoviePageComponent,
		resolve: {
			movie: MovieResolver
		}
	},
	{ path: '**', redirectTo: '' }
];
