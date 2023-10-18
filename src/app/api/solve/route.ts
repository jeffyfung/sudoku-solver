import { DancingLink } from "@/app/modules/dancing-link";
import { IncompleteSudokuGrid, SudokuService } from "@/app/modules/sudoku";
import { ServerResponse } from "@/lib/interfaces/server-response";
import { NextRequest, NextResponse } from "next/server";

export interface SolveRequestType {
  currentGridState: IncompleteSudokuGrid;
}

export interface SolveReturnType {
  solved: boolean;
  numSolution: number;
  outputGridState?: number[][];
}

export const POST = async (request: NextRequest) => {
  try {
    const { currentGridState } = (await request.json()) as SolveRequestType;

    // construct a constrain table based on current input
    const constraintMatrix = SudokuService.constructConstraintMatrix(currentGridState);
    const dlx = new DancingLink();
    const solutions = dlx.search(constraintMatrix);

    if (!solutions.length) {
      return NextResponse.json<ServerResponse<SolveReturnType>>({
        success: true,
        message: "No solution found",
        payload: {
          solved: false,
        },
      });
    }

    const outputGridState = currentGridState.map((row) => row.map((cell) => (typeof cell === "string" ? 0 : cell)));
    solutions[0].forEach((placement) => {
      outputGridState[placement.row][placement.col] = placement.val;
    });

    return NextResponse.json<ServerResponse<SolveReturnType>>({
      success: true,
      message:
        solutions.length > 1 //
          ? solutions.length === dlx.solutionLimit
            ? `${dlx.solutionLimit} or more solutions found. Showing the first one.`
            : `${solutions.length} solutions found. Showing the first one.`
          : "Returned the only solution",
      payload: {
        solved: true,
        numSolution: solutions.length,
        outputGridState,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json<ServerResponse<SolveReturnType>>(
      {
        success: false,
        message: `Error :: ${error.message}`,
      },
      { status: 500 }
    );
  }
};
