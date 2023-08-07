import { useSearchParams } from "react-router-dom";
import { useJobs } from "../../contexts/JobContext";
import Job from "./Job";
import JobFullDetail from "./JobFullDetail";
import styles from "./JobsAd.module.css";
import CircularProgress from "@mui/material/CircularProgress";
interface props {
  skills: string[];
}
function JobsAd({ skills }: props) {
  const { jobs, isLoading, selectedJob } = useJobs();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return (
    <div className={styles.container}>
      {id && <JobFullDetail selectedJob={selectedJob} skills={skills} />}
      {!id && isLoading && <CircularProgress />}
      {!isLoading && !id && (
        <>
          {" "}
          <h3>
            {jobs.length == 0 ? "No jobs found" : `${jobs.length} jobs found`}
          </h3>
          <ul className={styles.jobs}>
            {jobs.map((job) => (
              <>
                <Job key={job.id} job={job} skills={skills} />
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default JobsAd;
