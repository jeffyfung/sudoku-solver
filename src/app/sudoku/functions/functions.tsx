import { axioInstance } from "@/app/util/axios";
import styles from "./functions.module.css";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

enum ButtonType {
  SOLVE = "solve",
  HINT = "hint",
  CHECK = "check",
}

const Functions: React.FC<{}> = () => {
  const handleClick = async (type: ButtonType) => {
    switch (type) {
      case ButtonType.SOLVE:
        const payload: any = {};
        await axioInstance.post<any>("/api/solve", payload);
      default:
        // TODO: other api endpoints
        break;
    }
  };

  return (
    <div className={styles.container}>
      <fieldset className={styles.innerContainer}>
        <legend className={styles.legend}>Functions</legend>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleClick(ButtonType.SOLVE)}>
            Solve Puzzle
          </button>
          <div className={styles.tooltipContainer}>
            <Tooltip className="test" title="Solve the sudoku puzzle" arrow>
              <InfoIcon />
            </Tooltip>
          </div>
          <button className={styles.button} onClick={() => handleClick(ButtonType.HINT)}>
            Get Hint
          </button>
          <div className={styles.tooltipContainer}>
            <Tooltip title="Fill 5 empty cells" arrow>
              <InfoIcon />
            </Tooltip>
          </div>
          <button className={styles.button}>Check Solution</button>
          <div className={styles.tooltipContainer}>
            <Tooltip title="Return false if the puzzle has no solution" arrow>
              <InfoIcon />
            </Tooltip>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Functions;
