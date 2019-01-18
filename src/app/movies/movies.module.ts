import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesDAOService } from './movies.dao';
import { MoviesActions } from './movies.actions';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import {
	MatSelectModule,
	MatInputModule,
	MatFormFieldModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterMoviesPipe } from './pipes/filter-movies.pipe';
import { FilterMoviesComponent } from './filter-movies/filter-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GenresPipe } from './pipes/genres.pipe';

@NgModule({
	declarations: [
		MoviesListComponent,
		MovieListItemComponent,
		FilterMoviesPipe,
		GenresPipe,
		FilterMoviesComponent,
		MovieDetailsComponent
	],
	exports: [
		MoviesListComponent,
		MovieListItemComponent,
		FilterMoviesPipe,
		GenresPipe,
		FilterMoviesComponent,
		MovieDetailsComponent
	],
	imports: [
		HttpClientModule,
		CommonModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule
	],
	providers: [MoviesDAOService, MoviesActions, FilterMoviesPipe]
})
export class MoviesModule {}
