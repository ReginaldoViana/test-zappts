import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SlidersComponent } from './sliders/sliders.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone: true,
  imports: [SlidersComponent, FormComponent]
})
export class AppComponent {
  title = 'test-zappts';
}
