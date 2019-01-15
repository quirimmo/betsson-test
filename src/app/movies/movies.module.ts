import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesDAOService } from './movies.dao';
import { MoviesActions } from './movies.actions';

@NgModule({
	declarations: [],
	exports: [],
	imports: [HttpClientModule, CommonModule],
	providers: [MoviesDAOService, MoviesActions]
})
export class MoviesModule {}
