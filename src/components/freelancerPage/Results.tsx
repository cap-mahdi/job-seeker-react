import styles from "./Results.module.css";

interface props {
  children: React.ReactNode;
}

function Results({ children }: props) {
  return (
    <div className={styles.container}>
      <h2>...Results...</h2>
      <div className={styles.colors}>
        <div className={styles.red}>
          <hr /> <p>It doesn't fit your skills</p>
        </div>
        <div className={styles.orange}>
          <hr /> <p> It fits some of your skills</p>
        </div>
        <div className={styles.green}>
          <hr /> <p>It fits perfectly your skills</p>
        </div>
      </div>
      <div className={styles.layOut}>{children}</div>
    </div>
  );
}

export default Results;
