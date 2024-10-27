import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export const SIDEBAR_COLAPSED_WIDTH: number = 50;
export const SIDEBAR_EXPANDED_WIDTH: number = 170;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public setActiveTab: BehaviorSubject<string> = new BehaviorSubject<string>(
    'defaultTab'
  ); // UI attribute

  public sidebarWidth: BehaviorSubject<number> = new BehaviorSubject<number>(
    SIDEBAR_EXPANDED_WIDTH
  ); // UI attribute
  constructor() {}
}
