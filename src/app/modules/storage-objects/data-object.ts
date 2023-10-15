import { Placement } from "../sudoku";
import { ColumnObject } from "./column-object";

export class DataObject {
  left: DataObject;
  right: DataObject;
  up: DataObject | ColumnObject;
  down: DataObject | ColumnObject;
  column: ColumnObject;
  map: Placement;

  constructor(map: Placement, column: ColumnObject, left: DataObject | null = null, right: DataObject | null = null) {
    this.column = column;
    this.up = column.up;
    this.down = column;
    this.left = left ?? this;
    this.right = right ?? this;
    this.map = map;
  }
}
