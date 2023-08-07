import Choice from "../components/choosePage/Choice";
import styles from "./ChoosePage.module.css";
function ChoosePage() {
  return (
    <div className={styles.container}>
      <Choice
        title="freelancer mode"
        slogan="Find your Dream job"
        backgroundColor="#f95959"
        link="/jobs"
      />
      <Choice
        title="recruiter mode"
        slogan="Post your job"
        backgroundColor="#e3e3e3"
        color="#000"
        link="/recruiter"
      />
    </div>
  );
}

export default ChoosePage;
