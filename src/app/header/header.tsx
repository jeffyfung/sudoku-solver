"use client";

import Link from "next/link";
import styles from "./header.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { usePathname } from "next/navigation";

// TODO: small 3D rotating cube next to App Title
const Header: React.FC<{}> = () => {
  const pathName = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.appTitle}>Sudoku Solver</div>
      <div className={styles.githubLink}>
        <a href="https://atomic-flow-builder.vercel.app/" className={styles.githubButton} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className={styles.githubIcon} />
          <span>Code</span>
        </a>
      </div>
      {pathName !== "/" && (
        <div className={styles.nav}>
          <Link href="/">About</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
