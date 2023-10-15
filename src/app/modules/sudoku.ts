import { ColumnObject } from "./storage-objects/column-object";
import { DataObject } from "./storage-objects/data-object";

export const sth = () => {};

export type IncompleteSudokuGrid = (string | number)[][];

export interface Placement {
  row: number;
  col: number;
  val: number;
}

export class SudokuService {
  private static size: number = 9;

  static constructConstraintMatrix(grid: IncompleteSudokuGrid): ColumnObject {
    const matrixRoot = new ColumnObject("root");
    let currCol = matrixRoot;
    for (let i = 0; i < SudokuService.size * SudokuService.size; i++) {
      currCol.right = new ColumnObject(`cell-${i}`, currCol, matrixRoot);
      currCol = currCol.right;
    }
    for (let i = 0; i < SudokuService.size * SudokuService.size; i++) {
      currCol.right = new ColumnObject(`row-${i}`, currCol, matrixRoot);
      currCol = currCol.right;
    }
    for (let i = 0; i < SudokuService.size * SudokuService.size; i++) {
      currCol.right = new ColumnObject(`col-${i}`, currCol, matrixRoot);
      currCol = currCol.right;
    }
    for (let i = 0; i < SudokuService.size * SudokuService.size; i++) {
      currCol.right = new ColumnObject(`box-${i}`, currCol, matrixRoot);
      currCol = currCol.right;
    }
    matrixRoot.left = currCol;
    const columns = ColumnObject.getColumnArray(matrixRoot);

    for (let row = 0; row < SudokuService.size; row++) {
      for (let col = 0; col < SudokuService.size; col++) {
        if (typeof grid[row][col] === "string") {
          for (let val = 1; val <= SudokuService.size; val++) {
            SudokuService.setMatrixRow(columns, { row, col, val });
          }
        } else {
          SudokuService.setMatrixRow(columns, { row, col, val: grid[row][col] as number });
        }
      }
    }
    return matrixRoot;
  }

  private static setMatrixRow(columns: ColumnObject[], placement: Placement): void {
    const { row, col, val } = placement;

    const constraintIndices = [
      SudokuService.getCellContrainstIdx(row, col), //
      SudokuService.getRowContrainstIdx(row, val),
      SudokuService.getColContrainstIdx(col, val),
      SudokuService.getBoxContrainstIdx(row, col, val),
    ];
    let currCol: DataObject | null = null;
    let rowStart: DataObject;
    for (const idx of constraintIndices) {
      const constraint: DataObject = new DataObject(placement, columns[idx], currCol);
      if (currCol) {
        currCol.right = constraint;
        currCol = currCol.right;
      } else {
        rowStart = constraint;
        currCol = constraint;
      }
      columns[idx].up.down = constraint;
      columns[idx].up = constraint;
      columns[idx].size++;
    }
    currCol!.right = rowStart!;
    rowStart!.left = currCol!;
  }

  private static getCellContrainstIdx(row: number, col: number): number {
    return row * SudokuService.size + col;
  }

  private static getRowContrainstIdx(row: number, val: number): number {
    const offset = SudokuService.size * SudokuService.size;
    return offset + row * SudokuService.size + val - 1;
  }

  private static getColContrainstIdx(col: number, val: number): number {
    const offset = SudokuService.size * SudokuService.size * 2;
    return offset + col * SudokuService.size + val - 1;
  }

  private static getBoxContrainstIdx(row: number, col: number, val: number): number {
    const offset = SudokuService.size * SudokuService.size * 3;
    return offset + (3 * Math.floor(row / 3) + Math.floor(col / 3)) * 9 + val - 1;
  }
}
