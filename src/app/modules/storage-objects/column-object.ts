import { DataObject } from "./data-object";

export class ColumnObject {
  left: ColumnObject;
  right: ColumnObject;
  up: ColumnObject | DataObject;
  down: ColumnObject | DataObject;
  size: number = 0;
  name: string;

  constructor(name: string, left: ColumnObject | null = null, right: ColumnObject | null = null, size: number = 0) {
    this.name = name;
    this.size = size;
    this.left = left ?? this;
    this.right = right ?? this;
    this.up = this;
    this.down = this;
  }

  static getColumnArray(root: ColumnObject): ColumnObject[] {
    const array: ColumnObject[] = [];
    let col = root.right;
    while (!Object.is(col, root)) {
      array.push(col);
      col = col.right;
    }
    return array;
  }
}
