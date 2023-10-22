"use client";

import { useEffect, useState } from "react";
import styles from "./message-bar.module.css";
import CloseIcon from "@mui/icons-material/Close";

export interface MessageBarProps {
  open: boolean;
  name: string;
  title: string;
  message: string;
  handleClose: () => void;
}

export const MessageBar: React.FC<MessageBarProps> = ({ name, open, title, message, handleClose }) => {
  const [ignore, setIgnore] = useState<boolean>(true);

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`message-${name}`, e.target.checked ? "ignored" : "");
  };

  useEffect(() => {
    setIgnore(localStorage.getItem(`message-${name}`) === "ignored");
  }, [name]);

  return (
    open &&
    !ignore && (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button className={styles.attachment} onClick={handleClose}>
            <CloseIcon className={styles.icon} />
          </button>
        </div>
        <div className={styles.message}>{message}</div>
        <div className={styles.footer}>
          <input type="checkbox" id="dont-show-again" name="dont-show-again" onChange={handleCheckboxClick} />
          <label className={styles.checkboxLabel} htmlFor="dont-show-again">
            Do not show again
          </label>
        </div>
      </div>
    )
  );
};
