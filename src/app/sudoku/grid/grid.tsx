import clsx from "clsx";
import styles from "./grid.module.css";

interface GridProps {
  gridData: (string | number)[][];
  blank: boolean[][];
  solved: boolean;
  handleInputChange: (row: number, col: number, value: string) => void;
}

export const SudokuGrid: React.FC<GridProps> = ({ gridData, blank, handleInputChange, solved }) => {
  return (
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
  );
};
