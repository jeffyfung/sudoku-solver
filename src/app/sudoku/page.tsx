"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Functions from "./functions/functions";
import { MessageBar } from "../../lib/components/snackbar/message-bar";
import { Output } from "./output/output";
import { SudokuGrid } from "./grid/grid";
import { IncompleteSudokuGrid } from "../modules/sudoku";

const Page: React.FC<{}> = () => {
  const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
  const deleteKeys = ["Backspace", "Delete"];
  const matrix = new Array(9).fill("").map(() => new Array(9).fill(""));
  const [gridData, setGridData] = useState<(number | string)[][]>(matrix);
  const [blank, setBlank] = useState<boolean[][]>(new Array(9).fill("").map(() => new Array(9).fill(true)));
  const [generated, setGenerated] = useState<boolean[][]>(new Array(9).fill("").map(() => new Array(9).fill(true)));
  const [solved, setSolved] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [outputText, setOutputText] = useState<string | null>(null);

  const handleInputChange = (row: number, col: number, value: string) => {
    if (solved) return;
    if (arrowKeys.includes(value)) return handleArrowKeys(row, col, value);
    if (deleteKeys.includes(value)) return handleDeleteKeys(row, col);
    const val = parseInt(value);
    if (val && val > 0 && val < 10) {
      setGridData((gridData) => {
        const updatedGridData = structuredClone(gridData);
        updatedGridData[row][col] = val;
        return updatedGridData;
      });
      setBlank((blank) => {
        const updatedBlank = structuredClone(blank);
        updatedBlank[row][col] = false;
        return updatedBlank;
      });
    }
  };

  const handleArrowKeys = (row: number, col: number, value: string): void => {
    let newActiveRow;
    let newActiveCol;
    switch (value) {
      case "ArrowDown":
        newActiveRow = Math.min(row + 1, gridData.length - 1);
        newActiveCol = col;
        break;
      case "ArrowUp":
        newActiveRow = Math.max(row - 1, 0);
        newActiveCol = col;
        break;
      case "ArrowRight":
        newActiveRow = row;
        newActiveCol = Math.min(col + 1, gridData.length - 1);
        break;
      case "ArrowLeft":
        newActiveRow = row;
        newActiveCol = Math.max(col - 1, 0);
        break;
    }
    document.querySelector<HTMLInputElement>(`input[data-col='${newActiveCol}'][data-row='${newActiveRow}']`)!.focus();
  };

  const handleDeleteKeys = (row: number, col: number): void => {
    setGridData((gridData) => {
      const out = structuredClone(gridData);
      out[row][col] = "";
      return out;
    });
    setBlank((blank) => {
      const updatedBlank = structuredClone(blank);
      updatedBlank[row][col] = true;
      return updatedBlank;
    });
  };

  const handleAnswer = (gridState: number[][]) => {
    setSolved(true);
    setGridData(gridState);
  };

  const resetGridState = (blankMap?: boolean[][]) => {
    setSolved(false);
    setBlank(blankMap ? blankMap : new Array(9).fill("").map(() => new Array(9).fill(true)));
  };

  const resetSudoku = () => {
    setGridData(new Array(9).fill("").map(() => new Array(9).fill("")));
    setOutputText(null);
    resetGridState();
  };

  const showPuzzle = (gridState: IncompleteSudokuGrid) => {
    resetGridState(gridState.map((row) => row.map((cell) => cell === "")));
    setGridData(gridState);
    setGenerated(gridState.map((row) => row.map((cell) => cell !== "")));
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <SudokuGrid gridData={gridData} blank={blank} solved={solved} generated={generated} handleInputChange={handleInputChange} />
        <div className={styles.panelContainer}>
          <Functions gridData={gridData} handleAnswer={handleAnswer} handleReset={resetSudoku} handleMessage={setOutputText} showPuzzle={showPuzzle} />
          <Output text={outputText} />
        </div>
      </div>
      <div>
        <MessageBar
          name={"keyboard-nav"} //
          open={showMessage}
          title={"Did you know?"}
          message={"You can navigate to adjacent cells using the arrows keys of your keyboard"}
          handleClose={() => setShowMessage(false)}
        />
      </div>
    </>
  );
};

export default Page;
