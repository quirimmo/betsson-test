import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppNavigatorLinkComponent } from './app-navigator-link.component';
import { MatIconModule } from '@angular/material';

@NgModule({
	imports: [CommonModule, RouterModule, MatIconModule],
	declarations: [AppNavigatorLinkComponent],
	exports: [AppNavigatorLinkComponent],
	providers: []
})
export class AppNavigatorLinkModule {}
