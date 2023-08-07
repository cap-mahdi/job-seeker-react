import Filters from "../components/freelancerPage/Filters";
import JobsAd from "../components/freelancerPage/JobsAd";
import Map from "../components/freelancerPage/Map";
import Results from "../components/freelancerPage/Results";
import Slogan from "../components/common/Slogan";
import { useState } from "react";
import styles from "./FreelancerPage.module.css";
function FreelancerPage() {
  const [skills, setSkills] = useState([]);
  return (
    <div className={styles.container}>
      <Slogan />
      <Filters skills={skills} setSkills={setSkills} />
      <Results>
        <JobsAd skills={skills} />
        <Map />
      </Results>
    </div>
  );
}

export default FreelancerPage;
