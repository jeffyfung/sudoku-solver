import { DancingLink } from "@/app/modules/dancing-link";
import { IncompleteSudokuGrid, SudokuService } from "@/app/modules/sudoku";
import { NextRequest, NextResponse } from "next/server";

export interface SolveRequestType {
  currentGridState: IncompleteSudokuGrid;
}

export interface SolveReturnType {
  outputGridState: number[][];
}

export const POST = async (request: NextRequest) => {
  try {
    const { currentGridState } = (await request.json()) as SolveRequestType;

    // construct a constrain table based on current input
    const constraintMatrix = SudokuService.constructConstraintMatrix(currentGridState);
    const dlx = new DancingLink();
    const solutions = dlx.search(constraintMatrix);

    // TODO:
    if (!solutions) throw new Error("No solution found");

    const outputGridState = currentGridState.map((row) => row.map((cell) => (typeof cell === "string" ? 0 : cell)));
    solutions[0].forEach((placement) => {
      outputGridState[placement.row][placement.col] = placement.val;
    });

    return NextResponse.json<SolveReturnType>({ outputGridState });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
