import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HoadonbanraComponent } from './site/hoadonbanra/hoadonbanra.component';
@Component({
  standalone: true,
  imports: [RouterModule,HoadonbanraComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fe_ketoan';
}
