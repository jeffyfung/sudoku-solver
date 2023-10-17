import styles from "./output.module.css";

export interface OutputProps {
  text: string | null;
}

export const Output: React.FC<OutputProps> = ({ text }) => {
  if (text === null) return <></>;

  return (
    <fieldset className={styles.container}>
      <legend className={styles.legend}>Output</legend>
      <div className={styles.content}>{text}</div>
    </fieldset>
  );
};
