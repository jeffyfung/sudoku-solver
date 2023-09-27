"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Functions from "./functions/functions";

// TODO: did you know?

const Page: React.FC<{}> = () => {
  const matrix = new Array(9).fill("").map(() => new Array(9).fill(""));
  const [gridData, setGridData] = useState<(number | string)[][]>(matrix);

  const handleInputChange = (row: number, col: number, value: string) => {
    if (value) {
      const val = parseInt(value.at(-1)!);
      if (val) {
        setGridData((gridData) => {
          const updatedGridData = structuredClone(gridData);
          updatedGridData[row][col] = val;
          return updatedGridData;
        });
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const activeElement = document.activeElement;
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) {
      return;
    }
    if (activeElement) {
      const activeRow = parseInt(activeElement.getAttribute("data-row")!);
      const activeCol = parseInt(activeElement.getAttribute("data-col")!);
      let newActiveRow;
      let newActiveCol;
      switch (event.key) {
        case "ArrowDown":
          newActiveRow = Math.min(activeRow + 1, gridData.length - 1);
          newActiveCol = activeCol;
          break;
        case "ArrowUp":
          newActiveRow = Math.max(activeRow - 1, 0);
          newActiveCol = activeCol;
          break;
        case "ArrowRight":
          newActiveRow = activeRow;
          newActiveCol = Math.min(activeCol + 1, gridData.length - 1);
          break;
        case "ArrowLeft":
          newActiveRow = activeRow;
          newActiveCol = Math.max(activeCol - 1, 0);
          break;
      }
      document.querySelector<HTMLInputElement>(`input[data-col='${newActiveCol}'][data-row='${newActiveRow}']`)!.focus();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <table className={styles.table} onKeyDown={handleKeyDown}>
          <tbody>
            {gridData.map((row, rowIndex) => (
              <tr className={styles.row} key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td className={styles.cell} key={colIndex}>
                    <input
                      className={styles.input} //
                      data-row={rowIndex}
                      data-col={colIndex}
                      type="text"
                      value={col}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Functions />
    </div>
  );
};

export default Page;
