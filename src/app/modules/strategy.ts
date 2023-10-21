import _ from "lodash";
import { ColumnObject } from "./storage-objects/column-object";
import { DataObject, isDataObject } from "./storage-objects/data-object";

export class Strategy {
  static leastSatisfiedConstraint(root: ColumnObject): ColumnObject {
    let minCol = root.right;
    let minColSize = root.right.size;
    let currentCol = root.right.right;
    while (currentCol !== root) {
      if (currentCol.size < minColSize) {
        minColSize = currentCol.size;
        minCol = currentCol;
      }
      currentCol = currentCol.right;
    }
    return minCol;
  }

  static normalPlacementOrder(header: ColumnObject): DataObject[] {
    const rows: DataObject[] = [];
    let row = header.down;
    while (row !== header) {
      if (!isDataObject(row)) throw new Error("currentRow is not a DataObject");
      rows.push(row);
      row = row.down;
    }
    return rows;
  }

  static randomPlacementOrder(header: ColumnObject): DataObject[] {
    const rows = Strategy.normalPlacementOrder(header);
    return _.shuffle(rows);
  }
}
