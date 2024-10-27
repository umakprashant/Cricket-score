import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftPanelComponent } from './component/left-panel/left-panel.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cricket-score-app';
  constructor(@Inject(DOCUMENT) private document: Document) {
    let theme = 'light';
    if (typeof window !== 'undefined') {
      theme =
        localStorage.getItem('CURRENT_THEME') === null
          ? 'light'
          : localStorage.getItem('CURRENT_THEME');
    }
    debugger;
    this.document.body.classList.add(theme);
  }
}
