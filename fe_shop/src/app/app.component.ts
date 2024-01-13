import { Component, HostBinding, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule,MainComponent,CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Shop Online';
}
