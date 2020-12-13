import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, BrowserModule, RouterModule],
  exports: [HomePageComponent],
})
export class HomeModule {}
