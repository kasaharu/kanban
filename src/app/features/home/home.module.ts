import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
  declarations: [HomePageComponent, HomeComponent],
  imports: [CommonModule, BrowserModule, RouterModule],
  exports: [HomePageComponent],
})
export class HomeModule {}
