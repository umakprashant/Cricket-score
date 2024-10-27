import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [NgClass, MatIcon, RouterModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
})
export class LeftPanelComponent {
  public sidebarWidth: number;
  // @Input() public sidebarWidth: number;
  public toggleState: string = 'close-sidemenu';
  public setActiveTab: string;
}
