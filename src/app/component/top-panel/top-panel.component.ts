import { DOCUMENT, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import {
  UtilsService,
  SIDEBAR_COLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from '../../shared/services/utils.service';

@Component({
  selector: 'app-top-panel',
  standalone: true,
  imports: [MatIcon, NgClass, MatIconModule, MatButtonModule, MatMenu],
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
})
export class TopPanelComponent {
  public toggleState: string = 'open-sidemenu';
  public isDarkMode: boolean = false;
  public isDarkModeButton: boolean = false;
  public sideBarOpen: boolean = false;
  public sidebarWidth: number;

  constructor(
    private utils: UtilsService,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (typeof window !== 'undefined') {
      // Safe to use localStorage in the browser
      this.isDarkMode = localStorage.getItem('CURRENT_THEME') === 'dark';
      this.isDarkModeButton = this.isDarkMode;
    }

    this.utils.sidebarWidth.subscribe((res) => {
      if (!this.sideBarOpen) {
        this.sideBarOpen = true;
        this.sidebarWidth = res;
        this.toggleSideBar();
      }
    });
  }

  public closeSideBar(): void {
    this.toggleState = 'open-sidemenu';
    this.sidebarWidth = SIDEBAR_COLAPSED_WIDTH;
    this.utils.sidebarWidth.next(this.sidebarWidth);
  }

  public openSideBar(): void {
    this.toggleState = 'close-sidemenu';
    this.sidebarWidth = SIDEBAR_EXPANDED_WIDTH;
    this.utils.sidebarWidth.next(this.sidebarWidth);
  }

  public changeTheme(isDark: boolean = false): void {
    this.isDarkMode = isDark ?? !this.isDarkMode;
    this.document.body.classList.remove(!isDark ? 'dark' : 'light');
    this.document.body.classList.add(isDark ? 'dark' : 'light');

    if (typeof window !== 'undefined') {
      localStorage.setItem('CURRENT_THEME', isDark ? 'dark' : 'light');
    }
    this.isDarkModeButton = !this.isDarkModeButton;
  }

  public toggleSideBar(): void {
    if (this.toggleState === undefined) {
      this.toggleState = 'close-sidemenu';
    }
    if (this.toggleState === 'close-sidemenu') {
      this.closeSideBar();
    } else {
      this.openSideBar();
    }
  }
}
