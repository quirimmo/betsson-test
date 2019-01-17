import { AppRoutes } from './app.routes';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { MoviesResolver } from './resolvers/movies.resolver';
import { MovieResolver } from './resolvers/movie.resolver';
import { ViewMoviePageComponent } from './routes/view-movie-page/view-movie-page.component';

describe('App Routes', () => {
	it('should be defined', () => {
		expect(AppRoutes).toBeDefined();
	});
	it('should be an array', () => {
		expect(AppRoutes).toBeInstanceOf(Array);
	});
	it('should define 3 routes', () => {
		expect(AppRoutes).toHaveLength(3);
	});

	describe('movies list route', () => {
		const route = AppRoutes[0];

		it('should define the path', () => {
			expect(route.path).toEqual('');
		});

		it('should define the component', () => {
			expect(route.component).toEqual(HomePageComponent);
		});

		it('should define the resolver', () => {
			expect(route.resolve.movies).toEqual(MoviesResolver);
		});
	});
	describe('movie route', () => {
		const route = AppRoutes[1];

		it('should define the path', () => {
			expect(route.path).toEqual('movie/:id');
		});

		it('should define the component', () => {
			expect(route.component).toEqual(ViewMoviePageComponent);
		});

		it('should define the resolver', () => {
			expect(route.resolve.movie).toEqual(MovieResolver);
		});
	});
	describe('default route', () => {
		const route = AppRoutes[2];

		it('should define the path', () => {
			expect(route.path).toEqual('**');
		});

		it('should define the redirect', () => {
			expect(route.redirectTo).toEqual('');
		});
	});
});
