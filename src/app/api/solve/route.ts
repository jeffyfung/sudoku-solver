import { NextRequest, NextResponse } from "next/server";

export interface SolveRequestType {
  currentGridState: (string | number)[][];
}

export interface SolveReturnType {
  outputGridState: number[][];
}

export const POST = async (request: NextRequest) => {
  try {
    const data = (await request.json()) as SolveRequestType;

    const temp = new Array(9).fill(0).map(() => new Array(9).fill(0));

    const responseObj: SolveReturnType = {
      outputGridState: temp,
    };

    return NextResponse.json(responseObj);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
