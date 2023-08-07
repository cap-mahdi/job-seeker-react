import styles from "./Job.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useJobs } from "../../contexts/JobContext";
import { getColor } from "./getColor";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
interface props {
  job: {
    id: number;
    title: string;
    description: string;
    skills: string[];
    salary: {
      min: number;
      max: number;
    };
    "job-type": string;
    mobility: string;
    location: {
      lng: number;
      lat: number;
    };
    company: string;
    country: string;
  };
  details?: boolean;
  skills?: string[];
}

function Job({ job, details = false, skills: skillsInput = [] }: props) {
  const {
    id,
    title,
    description,
    company,
    skills,
    salary,
    "job-type": jobType,
    mobility,
    country,
  } = job;
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

  return (
    <li
      className={`${styles.container} ${
        !details && selectedJob?.id == id ? styles.selected : ""
      } ${details && styles.detailed}`}
      onClick={handleClick}
      onMouseEnter={() => hoverJob(job)}
      onMouseLeave={() => hoverJob(null)}
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
          {skills.map((skill) => {
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
          <span> min Salary: {salary.min}$</span>
          <Box sx={{ width: 150 }}>
            <Slider
              min={Number(import.meta.env.VITE_MIN_SALARY)}
              max={Number(import.meta.env.VITE_MAX_SALARY)}
              step={50}
              getAriaLabel={() => "Salary"}
              value={[salary.min, salary.max]}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value}$`}
              size="small"
              disabled
            />
          </Box>
          <span> max Salary: {salary.max}$</span>
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
