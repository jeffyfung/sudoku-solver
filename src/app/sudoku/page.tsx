"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Functions from "./functions/functions";
import clsx from "clsx";

// TODO: did you know?

const Page: React.FC<{}> = () => {
  const matrix = new Array(9).fill("").map(() => new Array(9).fill(""));
  const [gridData, setGridData] = useState<(number | string)[][]>(matrix);
  const [showAni, setShowAni] = useState<boolean>(false);

  const handleInputChange = (row: number, col: number, value: string) => {
    if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(value)) {
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
    } else {
      const val = parseInt(value);
      if (val && val >= 0 && val < 10) {
        setGridData((gridData) => {
          const updatedGridData = structuredClone(gridData);
          updatedGridData[row][col] = val;
          return updatedGridData;
        });
      }
    }
  };

  const handleRotationAnimation = (gridState: (string | number)[][]) => {
    setShowAni(true);
    setGridData(gridState);
    setTimeout(() => setShowAni(false), 500);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <table className={styles.table}>
          <tbody>
            {gridData.map((row, rowIndex) => (
              <tr className={styles.row} key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td className={styles.cell} key={colIndex}>
                    <input
                      className={clsx(styles.input, { [styles.rotationAnimation]: showAni })} //
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
      <Functions gridData={gridData} handleRotationAnimation={handleRotationAnimation} />
    </div>
  );
};

export default Page;
