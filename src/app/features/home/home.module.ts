import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
    imports: [CommonModule, BrowserModule, RouterModule, SharedModule, HomePageComponent],
    exports: [HomePageComponent],
})
export class HomeModule {}
