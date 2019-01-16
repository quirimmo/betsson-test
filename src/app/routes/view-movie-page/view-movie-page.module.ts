import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMoviePageComponent } from './view-movie-page.component';
import { MoviesModule } from 'src/app/movies/movies.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ViewMoviePageComponent],
	imports: [CommonModule, MoviesModule, RouterModule],
	providers: [ViewMoviePageComponent],
	bootstrap: []
})
export class ViewMoviePageRouteModule {}
