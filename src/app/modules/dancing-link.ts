import { ColumnObject } from "./storage-objects/column-object";
import { DataObject } from "./storage-objects/data-object";
import { Placement } from "./sudoku";

export type Solution = Placement[];

export class DancingLink {
  private solutionLimit: number;
  private solutionList: Solution[];

  constructor(solutionLimit: number = 10) {
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
    const colHeader = this.pickColumn(root);
    this.cover(colHeader);
    let currentRow = colHeader.down;
    while (currentRow !== colHeader) {
      if (!isDataObject(currentRow)) throw new Error("currentRow is not a DataObject");
      let currentCol = currentRow.right;
      while (currentCol !== currentRow) {
        this.cover(currentCol.column);
        currentCol = currentCol.right;
      }
      const terminate = this.dfsSearch(root, solution.concat(currentRow.map));
      if (terminate) return terminate;
      currentCol = currentRow.left;
      while (currentCol !== currentRow) {
        this.uncover(currentCol.column);
        currentCol = currentCol.left;
      }
      currentRow = currentRow.down;
    }
    this.uncover(colHeader);
    return false;
  }

  pickColumn(root: ColumnObject): ColumnObject {
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

const isDataObject = (object: ColumnObject | DataObject): object is DataObject => {
  return (object as DataObject).column !== undefined;
};
