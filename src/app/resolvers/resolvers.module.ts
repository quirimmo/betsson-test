import { NgModule } from '@angular/core';
import { MoviesResolver } from './movies.resolver';
import { MoviesModule } from '../movies/movies.module';
import { MovieResolver } from './movie.resolver';

@NgModule({
	declarations: [],
	imports: [MoviesModule],
	providers: [MoviesResolver, MovieResolver],
	bootstrap: []
})
export class ResolversModule {}
