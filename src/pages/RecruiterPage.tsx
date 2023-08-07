import FormAddJob from "../components/recruiterPage/FormAddJob";
import Map from "../components/recruiterPage/Map";
import styles from "./RecruiterPage.module.css";
import { useState } from "react";

const DEFAULT_POSITION = [51.505, -0.09];

function RecruiterPage() {
  const [position, setPosition] = useState(DEFAULT_POSITION);
  return (
    <div className={styles.container}>
      <FormAddJob position={position} />
      <Map position={position} setPosition={setPosition} />
    </div>
  );
}

export default RecruiterPage;
