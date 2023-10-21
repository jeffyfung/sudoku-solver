import { NextResponse } from "next/server";
import { ServerResponse } from "@/lib/interfaces/server-response";
import { IncompleteSudokuGrid, SudokuService } from "@/app/modules/sudoku";
import { DancingLink, Solution } from "@/app/modules/dancing-link";
import { Strategy } from "@/app/modules/strategy";
import { ColumnObject } from "@/app/modules/storage-objects/column-object";

export interface GenerateReturnType {
  gridState: IncompleteSudokuGrid;
}

export const GET = async (request: Request) => {
  // generate a randomly filled grid - run the dlx algorithm on an empty grid, chooses row randomly
  // arrange the cells in a random order
  // for each cell, try to remove its value and solve the grid (irreducible puzzle)
  // if there is >1 solution, put it back and return the incomplete grid
  // if there is 1 solution, continue

  // generate a random grid
  try {
    let grid = SudokuService.generateEmptyGrid();
    grid = SudokuService.prefillFirstRow(grid);
    const constraintMatrix: ColumnObject | null = SudokuService.constructConstraintMatrix(grid);
    const generatorDlx: DancingLink | null = new DancingLink(1, Strategy.randomPlacementOrder);
    const steps: Solution | null = generatorDlx.search(constraintMatrix)[0];
    steps.forEach(({ row, col, val }) => (grid[row][col] = val));

    // remove cell values one by one in random order
    const cells = SudokuService.getRandomCellOrder();
    for (const { col, row } of cells) {
      const backup = grid[row][col];
      grid[row][col] = "";
      const constraintMatrix = SudokuService.constructConstraintMatrix(grid);
      const solverDlx = new DancingLink(2, Strategy.randomPlacementOrder);
      if (solverDlx.search(constraintMatrix).length > 1) {
        // irreducible puzzle
        grid[row][col] = backup;
        break;
      }
    }

    return NextResponse.json<ServerResponse<GenerateReturnType>>({
      success: true,
      message: "Random sudoku puzzle generated",
      payload: {
        gridState: grid,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json<ServerResponse<GenerateReturnType>>({
      success: false,
      message: `Error :: ${error.message}`,
    });
  }
};
