import styles from "./functions.module.css";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SolveRequestType, SolveReturnType } from "@/app/api/solve/route";
import { axioInstance } from "@/app/modules/axios";

enum ButtonType {
  SOLVE = "solve",
  HINT = "hint",
  CHECK = "check",
}

export interface FunctionsProps {
  gridData: (string | number)[][];
  handleAnimation: (gridState: number[][]) => void;
  handleReset: () => void;
  handleMessage: (text: string) => void;
}

const Functions: React.FC<FunctionsProps> = ({ gridData, handleAnimation, handleReset, handleMessage }) => {
  const handleClick = async (type: ButtonType) => {
    switch (type) {
      case ButtonType.SOLVE:
        const payload: SolveRequestType = { currentGridState: gridData };
        const { data } = await axioInstance.post<SolveReturnType>("/api/solve", payload);
        if (data.solved) {
          handleAnimation(structuredClone(data.outputGridState));
        } else {
          handleMessage(data.message);
        }
      default:
        // TODO: other api endpoints
        break;
    }
  };

  return (
    <fieldset className={styles.container}>
      <legend className={styles.legend}>Functions</legend>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => handleClick(ButtonType.SOLVE)}>
          Solve Puzzle
        </button>
        <div className={styles.tooltipContainer}>
          <Tooltip className="test" title="Solve the sudoku puzzle" arrow>
            <InfoIcon className={styles.infoIcon} />
          </Tooltip>
        </div>
        <button className={styles.button} onClick={() => handleClick(ButtonType.HINT)}>
          Get Hint
        </button>
        <div className={styles.tooltipContainer}>
          <Tooltip title="Fill 5 empty cells" arrow>
            <InfoIcon className={styles.infoIcon} />
          </Tooltip>
        </div>
        <button className={styles.button}>Check Solution</button>
        <div className={styles.tooltipContainer}>
          <Tooltip title="Return false if the puzzle has no solution" arrow>
            <InfoIcon className={styles.infoIcon} />
          </Tooltip>
        </div>
        <button className={styles.button} onClick={handleReset}>
          Reset Sudoku
        </button>
      </div>
    </fieldset>
  );
};

export default Functions;
