export interface CommonTableDataType {
  columnDef: string;
  columnType: string;
  displayName: string;
  sign: string;
  dependentColumn: string;
}
export enum ColumnType {
  TEXT = 'TEXT',
  LINK = 'LINK',
  DATE = 'DATE',
  CHECKBOX = 'CHECKBOX',
  BUTTON_GROUP = 'BUTTON_GROUP',
  HTML = 'HTML',
  LINK_WITH_SEARCH = 'LINK_WITH_SEARCH',
  LINK_WITH_SCROLL = 'LINK_WITH_SCROLL',
  PROGRESS_BAR = 'PROGRESS_BAR',
  NUMBER = 'NUMBER',
  TIMESTAMP = 'TIMESTAMP',
  SESSION_ID = 'SESSION_ID',
  ASSIGN_GROUP = 'ASSIGN_GROUP',
}
