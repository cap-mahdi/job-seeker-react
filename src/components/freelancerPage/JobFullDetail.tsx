import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import styles from "./JobFullDetail.module.css";

import Job from "./Job";
import { useJobs } from "../../contexts/JobContext";
import { useNavigate } from "react-router";
import { Job as JobType } from "../../Types";

interface props {
  selectedJob: JobType | null;
  skills: string[];
}

function JobFullDetail({ selectedJob, skills }: props) {
  const { isLoading, setIsLoading } = useJobs();
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedJob) return;
  }, []);

  return (
    <div className={styles.container}>
      <button
        className={styles.applyButton}
        disabled={isLoading}
        onClick={() =>
          alert("This project is a learning project\n but who knows?, maybe...")
        }
      >
        Apply now
      </button>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Job job={selectedJob} details={true} skills={skills} />
      )}
      <button
        className={styles.backButton}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          navigate("/jobs");
        }}
      >
        {" "}
        &#8592; Back
      </button>
    </div>
  );
}

export default JobFullDetail;
