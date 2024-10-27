import { CommonTableDataType, ColumnType } from './table-interface';

export class ColumnHelper {
  public static matchColumn: CommonTableDataType[] = [
    {
      columnDef: 'select',
      columnType: ColumnType.CHECKBOX,
      displayName: '',
      sign: '',
      dependentColumn: 'select',
    },
    {
      columnDef: 'id',
      columnType: ColumnType.TEXT,
      displayName: 'No.',
      sign: '',
      dependentColumn: 'id',
    },
    {
      columnDef: 'type',
      columnType: ColumnType.TEXT,
      displayName: `Flag Type Name`,
      sign: '',
      dependentColumn: 'type',
    },
    {
      columnDef: 'action',
      columnType: ColumnType.BUTTON_GROUP,
      displayName: `Action`,
      sign: '(#)',
      dependentColumn: 'action',
    },
  ];
  public static teamColumn: CommonTableDataType[] = [
    {
      columnDef: 'select',
      columnType: ColumnType.CHECKBOX,
      displayName: '',
      sign: '',
      dependentColumn: 'select',
    },
    {
      columnDef: 'id',
      columnType: ColumnType.TEXT,
      displayName: 'No.',
      sign: '',
      dependentColumn: 'id',
    },
    {
      columnDef: 'type',
      columnType: ColumnType.TEXT,
      displayName: `Flag Type Name`,
      sign: '',
      dependentColumn: 'type',
    },
    {
      columnDef: 'action',
      columnType: ColumnType.BUTTON_GROUP,
      displayName: `Action`,
      sign: '(#)',
      dependentColumn: 'action',
    },
  ];
  public static playerColumn: CommonTableDataType[] = [
    {
      columnDef: 'select',
      columnType: ColumnType.CHECKBOX,
      displayName: '',
      sign: '',
      dependentColumn: 'select',
    },
    {
      columnDef: 'id',
      columnType: ColumnType.TEXT,
      displayName: 'No.',
      sign: '',
      dependentColumn: 'id',
    },
    {
      columnDef: 'type',
      columnType: ColumnType.TEXT,
      displayName: `Flag Type Name`,
      sign: '',
      dependentColumn: 'type',
    },
    {
      columnDef: 'action',
      columnType: ColumnType.BUTTON_GROUP,
      displayName: `Action`,
      sign: '(#)',
      dependentColumn: 'action',
    },
  ];
}
