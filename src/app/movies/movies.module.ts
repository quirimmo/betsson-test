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

@NgModule({
	declarations: [MoviesListComponent, MovieListItemComponent, FilterMoviesPipe],
	exports: [MoviesListComponent, MovieListItemComponent, FilterMoviesPipe],
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
	providers: [MoviesDAOService, MoviesActions]
})
export class MoviesModule {}
