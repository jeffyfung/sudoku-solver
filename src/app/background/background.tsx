import styles from "./background.module.css";

const Background: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bubbles}>
        <div style={{ "--i": 12 } as React.CSSProperties}></div>
        <div style={{ "--i": 10 } as React.CSSProperties}></div>
        <div style={{ "--i": 23 } as React.CSSProperties}></div>
        <div style={{ "--i": 20 } as React.CSSProperties}></div>
        <div style={{ "--i": 11 } as React.CSSProperties}></div>
        <div style={{ "--i": 29 } as React.CSSProperties}></div>
        <div style={{ "--i": 13 } as React.CSSProperties}></div>
        <div style={{ "--i": 16 } as React.CSSProperties}></div>
        <div style={{ "--i": 27 } as React.CSSProperties}></div>
        <div style={{ "--i": 9 } as React.CSSProperties}></div>
        <div style={{ "--i": 14 } as React.CSSProperties}></div>
        <div style={{ "--i": 17 } as React.CSSProperties}></div>
        <div style={{ "--i": 21 } as React.CSSProperties}></div>
        <div style={{ "--i": 26 } as React.CSSProperties}></div>
        <div style={{ "--i": 11 } as React.CSSProperties}></div>
        <div style={{ "--i": 18 } as React.CSSProperties}></div>
        <div style={{ "--i": 26 } as React.CSSProperties}></div>
        <div style={{ "--i": 30 } as React.CSSProperties}></div>
        <div style={{ "--i": 13 } as React.CSSProperties}></div>
        <div style={{ "--i": 16 } as React.CSSProperties}></div>
        <div style={{ "--i": 19 } as React.CSSProperties}></div>
        <div style={{ "--i": 16 } as React.CSSProperties}></div>
        <div style={{ "--i": 12 } as React.CSSProperties}></div>
        <div style={{ "--i": 26 } as React.CSSProperties}></div>
      </div>
    </div>
  );
};

export default Background;
