import styles from "./functions.module.css";
import { Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SolveRequestType, SolveReturnType } from "@/app/api/solve/route";
import { axioInstance } from "@/app/modules/axios";
import { ServerResponse } from "@/lib/interfaces/server-response";

enum ButtonType {
  SOLVE = "solve",
  GENERATE = "generate",
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
    if ([ButtonType.SOLVE, ButtonType.CHECK].includes(type)) {
      const payload: SolveRequestType = { currentGridState: gridData };
      const { data } = await axioInstance.post<ServerResponse<SolveReturnType>>("/api/solve", payload);
      if (type === ButtonType.SOLVE) {
        if (data.success && data.payload.solved) {
          handleAnimation(structuredClone(data.payload.outputGridState));
        }
        handleMessage(data.message);
      } else {
        const message = data.payload.solved ? `${data.payload.numSolution} solution(s) found` : "No solution found";
        handleMessage(message);
      }
    } else {
      // TODO: other api endpoints
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
        <button className={styles.button} onClick={() => handleClick(ButtonType.CHECK)}>
          Check Solution
        </button>
        <div className={styles.tooltipContainer}>
          <Tooltip title="Get the number of solutions for the sudoku puzzle" arrow>
            <InfoIcon className={styles.infoIcon} />
          </Tooltip>
        </div>
        <button className={styles.button} onClick={() => handleClick(ButtonType.GENERATE)}>
          Generate Puzzle
        </button>
        <div className={styles.tooltipContainer}>
          <Tooltip title="Generate a random sudoku puzzle" arrow>
            <InfoIcon className={styles.infoIcon} />
          </Tooltip>
        </div>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
    </fieldset>
  );
};

export default Functions;
