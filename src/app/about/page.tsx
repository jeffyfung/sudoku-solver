import Link from "next/link";
import styles from "./page.module.css";

const Page: React.FC<{}> = () => {
  return (
    <div className={styles.pageContainer}>
      <p className={styles.paragraph}>
        The sudoku solver uses the dancing links algorithm. The Dancing Links algorithm is a technique used for efficiently solving exact cover problems, particularly the exact cover problem in the context of algorithm X, which is a way to solve the classic backtracking problem. The algorithm was introduced by Donald Knuth in his paper &quot; Dancing Links &quot; in 2000. It can be used to solve
        constraint satisfaction problems that can be reduced to an exact cover problem for example Sudoku and the N-Queens problem.
      </p>
      <p className={styles.paragraph}>
        Here is a link to the paper that introduces the algorithm:&nbsp;
        <Link className={styles.link} href="https://arxiv.org/pdf/cs/0011047.pdf" target="_blank">
          Dancing Links
        </Link>
      </p>
      <p className={styles.paragraph}>
        In this application, the maximum amount of solution searched is limited to 10. The puzzle generation algorithm first generates a random solved sudoku grid by running the solver on a initial sudoku grid where the first row has been filled by a random permutation of numbers. Then, the cells in the sudoku grid is arranged in a random order. For each cell in that order, the algorihtm removes
        the value in that cell. The solver is then run on the grid. If the puzzle contains exactly one solution, we continue to remove the next value. If there are 2 or more solutions, the algorithm restored the value removed and return the state of the sudoku grid.
      </p>
    </div>
  );
};

export default Page;
