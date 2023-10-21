import { ColumnObject } from "./storage-objects/column-object";
import { DataObject, isDataObject } from "./storage-objects/data-object";
import { Strategy } from "./strategy";
import { Placement } from "./sudoku";

export type Solution = Placement[];

export class DancingLink {
  solutionLimit: number;
  private solutionList: Solution[];
  private constraintStrategy: (root: ColumnObject) => ColumnObject;
  private placementStrategy: (columnHeader: ColumnObject) => DataObject[];

  constructor(
    solutionLimit: number = 10, //
    placementStrategy: (columnHeader: ColumnObject) => DataObject[] = Strategy.normalPlacementOrder,
    constraintStrategy: (root: ColumnObject) => ColumnObject = Strategy.leastSatisfiedConstraint
  ) {
    this.constraintStrategy = constraintStrategy;
    this.placementStrategy = placementStrategy;
    this.solutionLimit = solutionLimit;
    this.solutionList = [];
  }

  search(root: ColumnObject): Solution[] {
    this.dfsSearch(root, []);
    return this.solutionList;
  }

  private dfsSearch(root: ColumnObject, solution: Placement[]): boolean {
    // no columns left, all constraints satisfied
    if (root.right === root) {
      this.solutionList.push(solution);
      return this.solutionList.length === this.solutionLimit;
    }
    const colHeader = this.constraintStrategy(root);
    this.cover(colHeader);
    for (const row of this.placementStrategy(colHeader)) {
      let currentCol = row.right;
      while (currentCol !== row) {
        this.cover(currentCol.column);
        currentCol = currentCol.right;
      }
      const terminate = this.dfsSearch(root, solution.concat(row.map));
      if (terminate) return terminate;
      currentCol = row.left;
      while (currentCol !== row) {
        this.uncover(currentCol.column);
        currentCol = currentCol.left;
      }
    }
    // let currentRow = colHeader.down;
    // while (currentRow !== colHeader) {
    //   if (!isDataObject(currentRow)) throw new Error("currentRow is not a DataObject");
    //   let currentCol = currentRow.right;
    //   while (currentCol !== currentRow) {
    //     this.cover(currentCol.column);
    //     currentCol = currentCol.right;
    //   }
    //   const terminate = this.dfsSearch(root, solution.concat(currentRow.map));
    //   if (terminate) return terminate;
    //   currentCol = currentRow.left;
    //   while (currentCol !== currentRow) {
    //     this.uncover(currentCol.column);
    //     currentCol = currentCol.left;
    //   }
    //   currentRow = currentRow.down;
    // }
    this.uncover(colHeader);
    return false;
  }

  cover(col: ColumnObject): void {
    col.right.left = col.left;
    col.left.right = col.right;
    let currentRow = col.down;
    while (currentRow !== col) {
      if (!isDataObject(currentRow)) throw new Error("currentRow is not a DataObject");
      let currentCol = currentRow.right;
      while (currentCol !== currentRow) {
        currentCol.down.up = currentCol.up;
        currentCol.up.down = currentCol.down;
        currentCol.column.size--;
        currentCol = currentCol.right;
      }
      currentRow = currentRow.down;
    }
  }

  uncover(col: ColumnObject): void {
    let currentRow = col.up;
    while (currentRow !== col) {
      if (!isDataObject(currentRow)) throw new Error("currentRow is not a DataObject");
      let currentCol = currentRow.left;
      while (currentCol !== currentRow) {
        currentCol.column.size++;
        currentCol.down.up = currentCol;
        currentCol.up.down = currentCol;
        currentCol = currentCol.left;
      }
      currentRow = currentRow.up;
    }
    col.right.left = col;
    col.left.right = col;
  }
}
