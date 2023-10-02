"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Functions from "./functions/functions";
import clsx from "clsx";
import { MessageBar } from "../components/snackbar/message-bar";

const Page: React.FC<{}> = () => {
  const matrix = new Array(9).fill("").map(() => new Array(9).fill(""));
  const [gridData, setGridData] = useState<(number | string)[][]>(matrix);
  const [blank, setBlank] = useState<boolean[][]>(new Array(9).fill("").map(() => new Array(9).fill(true)));
  const [showAni, setShowAni] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(true);

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
    }
  };

  const handleRotationAnimation = (gridState: (string | number)[][]) => {
    setShowAni(true);
    setGridData(gridState);
    setTimeout(() => {
      setBlank(new Array(9).fill("").map(() => new Array(9).fill(false)));
      setShowAni(false);
    }, 600);
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
                        className={clsx(styles.input, { [styles.rotationAnimation]: showAni && blank[rowIndex][colIndex] })} //
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
