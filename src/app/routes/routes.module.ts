import { NgModule } from '@angular/core';
import { HomePageRouteModule } from './home-page/home-page.module';
import { ViewMoviePageRouteModule } from './view-movie-page/view-movie-page.module';

@NgModule({
	declarations: [],
	imports: [HomePageRouteModule, ViewMoviePageRouteModule],
	providers: [],
	bootstrap: []
})
export class RoutesModule {}
