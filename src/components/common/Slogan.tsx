import styles from "./Slogan.module.css";
function Slogan() {
  return (
    <div className={styles.slogan}>
      <img src="/logo-transparent.png" alt="job seeker logo" />
      <h1>Find your next job</h1>
      <img src="/logo-transparent.png" alt="job seeker logo" />
    </div>
  );
}

export default Slogan;
