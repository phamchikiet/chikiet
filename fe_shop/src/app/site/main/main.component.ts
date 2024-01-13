import { Component, HostBinding, OnInit, ViewChild, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-main',
  standalone:true,
  imports: [RouterModule,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  ngOnInit(): void {
  }

}
