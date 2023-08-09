import styles from "./Job.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useJobs } from "../../contexts/JobContext";
import { getColor } from "./getColor";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import { Job as JobType } from "../../Types";
interface props {
  job: JobType | null;
  details?: boolean;
  skills?: string[];
}

function Job({ job, details = false, skills: skillsInput = [] }: props) {
  const {
    id,
    title,
    description,
    company,
    skills = [],
    salary,
    "job-type": jobType,
    mobility,
    country,
  } = job || {};
  const { selectedJob, selectJob, hoverJob, setIsLoading } = useJobs();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { color } = getColor(skills, user);
  function handleClick() {
    selectJob(job);
    if (!details) {
      setIsLoading(true);
      navigate(`/jobs?id=${id}`);
    }
  }
  function handleMouseEnter() {
    if (job) {
      hoverJob(job);
    }
  }

  function handleMouseLeave() {
    hoverJob(null);
  }
  return (
    <li
      className={`${styles.container} ${
        !details && selectedJob?.id == id ? styles.selected : ""
      } ${details && styles.detailed}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ borderColor: color }}
    >
      <div className={styles.title}>
        <h3>{title}</h3>
        <p>{company}</p>
      </div>
      {details && (
        <div className={styles.description}>
          <h4>Description: </h4>
          <p>{description}</p>
        </div>
      )}
      <div className={styles.skills}>
        <h4>Skills: </h4>
        <ul>
          {skills &&
            skills.map((skill: string) => {
              const inSkillsInput = skillsInput.includes(skill);
              return (
                <li
                  key={skill}
                  className={`${styles.skill} ${
                    inSkillsInput && styles.inSkillInput
                  }`}
                >
                  {skill}
                </li>
              );
            })}
        </ul>
      </div>
      <div className={styles.details}>
        <div className={styles.salary}>
          <span> min Salary: {salary && salary.min}$</span>
          <Box sx={{ width: 150 }}>
            <Slider
              min={Number(0)}
              max={Number(import.meta.env.VITE_MAX_SALARY)}
              step={50}
              getAriaLabel={() => "Salary"}
              value={salary && [salary.min, salary.max]}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value}$`}
              size="small"
              disabled
            />
          </Box>
          <span> max Salary: {salary && salary.max}$</span>
        </div>
        <div className={styles.others}>
          <p>Job Type: {jobType}</p>
          <p>Country: {country}</p>
          <p>On-site/remote: {mobility} </p>
        </div>
      </div>
    </li>
  );
}

export default Job;
