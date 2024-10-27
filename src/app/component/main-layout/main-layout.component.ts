import { Component } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { RouterModule } from '@angular/router';
import { TopPanelComponent } from '../top-panel/top-panel.component';
import { NgClass } from '@angular/common';
import {
  SIDEBAR_EXPANDED_WIDTH,
  UtilsService,
} from '../../shared/services/utils.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [LeftPanelComponent, RouterModule, TopPanelComponent, NgClass],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  public isSidePanelActive: boolean = false;
  public sidebarWidth: number = SIDEBAR_EXPANDED_WIDTH;
  constructor(private utils: UtilsService) {
    this.utils.sidebarWidth.subscribe((res) => (this.sidebarWidth = res));
  }
  public toggleState: string = 'close-sidemenu'; // UI attribute
}
