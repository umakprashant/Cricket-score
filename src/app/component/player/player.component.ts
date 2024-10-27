import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { CommonTableComponent } from '../common-table/common-table.component';
import { CommonTableDataType } from '../../shared/configs/table-interface';
import { ColumnHelper } from '../../shared/configs/table-coloums';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../../shared/services/utils.service';
import { MatSort } from '@angular/material/sort';
import { PAGE_DETAIL } from '../../shared/configs/const';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatExpansionModule,
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatLabel,
    ReactiveFormsModule,
    MatOption,
    MatCheckboxModule,
    RouterModule,
    MatTableModule,
    CommonTableComponent,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  public roundObj = [];
  public roundObjToShow = [];
  public isDataLoaded = false;
  public name: number;
  public gameId: number;
  public groupId: number;
  private dialogRef: MatDialogRef<any>;
  public selectedRound: string;
  public selectedRoundId: number;
  public searchValue: string = ''; // Changed to string type for ngModel
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openGroupCreatePopup') openGroupCreatePopup: TemplateRef<any>; // Reference to the notify block
  public matchColumn: CommonTableDataType[] = ColumnHelper.matchColumn;
  public dataSource = [];
  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  public pageSizeOptions: number[] = PAGE_DETAIL.PageSizeOptions;
  public roundLength: number;
  public groupPageIndex = 0;
  public groupPageSize = 25;
  public firstTimeLoad: boolean = false;
  public checkSelectAll: boolean = false;
  public isShowFilter: boolean = false;
  public isFullScreen: boolean = false;
  public searchText: string = '';
  public showClearButton: boolean = false;
  public isUpdate: boolean = false;
  public data: any[];
  public displayedColumns: string[] = ['select', 'id', 'name', 'action'];
  public gameName: any;
  public form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private util: UtilsService,
    private fb: FormBuilder
  ) {
    this.util.setActiveTab.next('league');
  }

  public ngOnInit() {
    this.firstTimeLoad = true;
    this.buildForm();
    this.getRoundData();
  }

  public getRoundData() {}

  public setDataSource(result, fromFilter = false) {
    const roundData = [];
    result.forEach((res) => {
      const startDate = fromFilter ? res.startDate : new Date(res.startDate);
      const endDate = fromFilter ? res.endDate : new Date(res.endDate);
      roundData.push({
        id: res.id,
        roundName: res.roundName,
        description: res.description,
        startDate: startDate,
        endDate: endDate,
      });
    });
    return roundData;
  }

  public searchRoundList() {
    this.roundObjToShow = this.roundObj.filter((res) =>
      res.roundName.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  public searchClear() {
    this.searchValue = ''; // Clear the search input
    this.roundObjToShow = this.roundObj;
  }

  public clearSearch() {
    this.searchText = '';
    this.searchGame();
  }

  public async searchGame(): Promise<void> {
    let searchGame = [...this.data];
    this.dataSource = searchGame.filter((res) =>
      res.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.roundLength = this.dataSource.length;
  }

  public toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }
  public async getGroupList(id?): Promise<void> {
    this.isDataLoaded = true;
    this.selectedRoundId = id ? id : this.selectedRoundId;
  }

  public setDataSourceGroup(result, fromFilter = false) {
    const groupData = [];
    result.forEach((res) => {
      groupData.push({
        id: res.id,
        groupName: res.groupName,
        leagueRoundId: res.leagueRoundId,
      });
    });
    return groupData;
  }

  public navigateTo(): void {
    this.router.navigate(['/squad/game/game-create']);
  }

  public async onPageChange(pageEvent: PageEvent): Promise<void> {
    this.groupPageIndex = pageEvent.pageIndex;
    this.groupPageSize = pageEvent.pageSize;
    this.getGroupList();
  }

  public confirmDeleteAll(): void {}

  public isAllSelected(): boolean {
    return this.selection?.selected?.length === this.dataSource?.length;
  }

  public toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.checkSelectAll = false;
    } else {
      this.dataSource.forEach((row: any) => {
        this.selection.select(row);
      });
      this.checkSelectAll = true;
    }
  }

  public checkboxLabel(row?: any, position?: string): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    const str: string = String(parseInt(position) + 1);
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${str}`;
  }

  public toggleFilter(): void {
    this.isShowFilter = !this.isShowFilter;
  }

  public onClearAllFilters(): void {
    this.selection.clear();
    this.checkSelectAll = false;
    this.showClearButton = false;
  }

  public sortData() {
    // this.dataSource.sort = this.sort;
  }

  public editContest(row): void {
    this.isUpdate = true;
    this.groupId = row.id;
    this.form.patchValue({
      groupName: row.groupName,
    });
    this.dialogRef = this.dialog.open(this.openGroupCreatePopup, {
      width: '500px',
      height: '500px', // Customize the width as needed
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      this.isUpdate = false;
      this.getRoundData();
      this.resetForm();
    });
  }

  public addGroup() {
    this.dialogRef = this.dialog.open(this.openGroupCreatePopup, {
      width: '500px',
      height: '500px', // Customize the width as needed
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      this.getRoundData();
      this.resetForm();
    });
  }

  public async submitForm() {}

  public async updateForm() {}

  public closePopup() {
    this.dialogRef.close();
  }
  public resetForm() {
    this.form.patchValue({
      groupName: '',
    });
  }

  public buildForm(): void {
    this.form = this.fb.group({
      // groupId: ['', [Validators.required]],
      groupName: [null, [Validators.required]],
    });
  }

  public async deleteGroup(row): Promise<void> {}
}
