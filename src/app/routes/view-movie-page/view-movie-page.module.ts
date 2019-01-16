import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMoviePageComponent } from './view-movie-page.component';
import { MoviesModule } from 'src/app/movies/movies.module';

@NgModule({
	declarations: [ViewMoviePageComponent],
	imports: [CommonModule, MoviesModule],
	providers: [ViewMoviePageComponent],
	bootstrap: []
})
export class ViewMoviePageRouteModule {}
