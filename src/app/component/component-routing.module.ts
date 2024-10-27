import { Routes } from '@angular/router';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './match/match.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

export const componentRoute: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: TeamComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
      {
        path: 'player',
        component: PlayerComponent,
      },
      {
        path: 'match',
        component: MatchComponent,
      },
      {
        path: 'scoreboard',
        component: ScoreboardComponent,
      },
    ],
  },
  {
    path: '**',
    component: MainLayoutComponent,
  },
];
