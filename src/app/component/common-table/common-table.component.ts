import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgStyle, DatePipe } from '@angular/common';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PAGE_DETAIL } from '../../shared/configs/const';
@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatProgressBar,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    NgStyle,
    MatPaginator,
    DatePipe,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
})
export class CommonTableComponent {
  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  @Input() data: any[] = [];
  @Input() public activeLanguage: string;
  @Input() public displayedColumns;
  @Input() public parent: string;
  @Input() public tableName: string;
  @Input() public loaderCondition?: boolean = false;
  @Input() public totalCount: number;
  @Input() public dynamic: boolean = true;
  @Output()
  public edit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public delete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public assign: EventEmitter<any> = new EventEmitter<any>();
  @Output() public applySelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() public pageDetails: EventEmitter<any> = new EventEmitter<any>();
  public displayedColumn = [];
  public dataSource: MatTableDataSource<any>;
  public pageSize: number = PAGE_DETAIL.PageSize;
  public pageIndex: number = PAGE_DETAIL.PageIndex;
  public pageSizeOptions: number[] = PAGE_DETAIL.PageSizeOptions;

  public isNoData: boolean;
  public projectId: string;
  public columnSizes: { [key: string]: number } = {};
  public availableColumns = [];
  public sortingDisabled: boolean = false;
  public selection = new SelectionModel<any>(true, []); // To handle selection
  constructor(public dialog: MatDialog) {}

  public ngOnChanges() {
    this.isNoData = this.loaderCondition;
    this.displayedColumn = this.displayedColumns.map((res) => res.columnDef);
    this.dataSource = new MatTableDataSource(this.data);
    if (!this.dynamic) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }
  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.applySelection.emit(this.selection.selected);
  }
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Select or deselect a single row
  public toggleSelection(row: any) {
    this.selection.toggle(row);
    this.applySelection.emit(this.selection.selected);
  }
  public isSelected(row: any): boolean {
    return this.selection.isSelected(row);
  }

  public getLink(columnDef: string, columnType: string, link?: string): string {
    let returnLink: string;
    if (columnType === 'LINK') {
      returnLink = `<a href="${window.location.origin}/aim/${link}/?language_code=${this.activeLanguage}" target="_blank">${columnDef}</a>`;
    }
    if (columnType === 'SESSION_ID') {
      returnLink = `<a href="${window.location.origin}/aim/v2/${this.parent}/sessions?language_code=${this.activeLanguage}&sessionId=${columnDef}" target="_blank">${columnDef}</a>`;
    }

    return returnLink;
  }
  public onSortingChanged(event) {
    this.dataSource = new MatTableDataSource(this.data);
    if (!this.dynamic) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }
  public editItem(data) {
    this.edit.emit(data);
  }
  public deleteItem(data) {
    this.delete.emit(data);
  }
  public assignItem(data) {
    this.assign.emit(data);
  }
  public async onPageChange(pageEvent: PageEvent): Promise<void> {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.pageDetails.emit(pageEvent);
  }
}
