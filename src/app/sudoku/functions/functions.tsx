import styles from "./functions.module.css";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SolveRequestType, SolveReturnType } from "@/app/api/solve/route";
import { axioInstance } from "@/app/modules/axios";
import { ServerResponse } from "@/lib/interfaces/server-response";
import { GenerateReturnType } from "@/app/api/generate/route";
import { IncompleteSudokuGrid } from "@/app/modules/sudoku";

enum ButtonType {
  SOLVE = "solve",
  GENERATE = "generate",
  CHECK = "check",
}

export interface FunctionsProps {
  gridData: (string | number)[][];
  handleAnswer: (gridState: number[][]) => void;
  handleReset: () => void;
  handleMessage: (text: string) => void;
  showPuzzle: (gridState: IncompleteSudokuGrid) => void;
}

const Functions: React.FC<FunctionsProps> = ({ gridData, handleAnswer, handleReset, handleMessage, showPuzzle }) => {
  const handleClick = async (type: ButtonType) => {
    if ([ButtonType.SOLVE, ButtonType.CHECK].includes(type)) {
      const payload: SolveRequestType = { currentGridState: gridData };
      const { data } = await axioInstance.post<ServerResponse<SolveReturnType>>("/api/solve", payload);
      if (type === ButtonType.SOLVE) {
        if (data.success && data.payload.solved) handleAnswer(structuredClone(data.payload.outputGridState!));
        handleMessage(data.message);
      } else {
        const message = data.payload.solved ? `${data.payload.numSolution} solution(s) found` : "No solution found";
        handleMessage(message);
      }
    } else {
      const { data } = await axioInstance.get<ServerResponse<GenerateReturnType>>(`/api/generate`);
      const { success, payload, message } = data;
      if (success) showPuzzle(payload.gridState);
      handleMessage(message);
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
