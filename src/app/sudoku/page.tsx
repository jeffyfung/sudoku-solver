"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Functions from "./functions/functions";
import clsx from "clsx";
import { MessageBar } from "../components/snackbar/message-bar";
import { Output } from "./output/output";

const Page: React.FC<{}> = () => {
  const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
  const deleteKeys = ["Backspace", "Delete"];
  const matrix = new Array(9).fill("").map(() => new Array(9).fill(""));
  const [gridData, setGridData] = useState<(number | string)[][]>(matrix);
  const [blank, setBlank] = useState<boolean[][]>(new Array(9).fill("").map(() => new Array(9).fill(true)));
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

  const showAnimation = (gridState: number[][]) => {
    setSolved(true);
    setGridData(gridState);
  };

  const resetSudoku = () => {
    setSolved(false);
    setGridData(new Array(9).fill("").map(() => new Array(9).fill("")));
    setBlank(new Array(9).fill("").map(() => new Array(9).fill(true)));
    setOutputText(null);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <table className={styles.table}>
            <tbody>
              {gridData.map((row, rowIndex) => (
                <tr className={styles.row} key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td className={styles.cell} key={colIndex}>
                      <input
                        className={clsx(styles.input, {
                          [styles.animation]: solved && blank[rowIndex][colIndex],
                          [styles.highlight]: blank[rowIndex][colIndex],
                        })}
                        data-row={rowIndex}
                        data-col={colIndex}
                        type="text"
                        value={col}
                        onKeyDown={(e) => handleInputChange(rowIndex, colIndex, e.key)}
                        onChange={() => {}}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.panelContainer}>
          <Functions gridData={gridData} handleAnimation={showAnimation} handleReset={resetSudoku} handleMessage={setOutputText} />
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
