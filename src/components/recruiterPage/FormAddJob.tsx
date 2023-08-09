import InputLabel from "./InputLabel";
import styles from "./FormAddJob.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SelectOptions from "../common/SelectOptions";
import { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobContext";
import { LatLngTuple } from "leaflet";

const jobTypeOptions = [
  { value: "full-time", label: "FullTime" },
  { value: "part-time", label: "PartTime" },
  { value: "internship", label: "Internship" },
];

const mobilityOptions = [
  { value: "remote", label: "Remote" },
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

interface Props {
  position: LatLngTuple;
}

function FormAddJob({ position }: Props) {
  const { skills: allSkills, addJob, isLoading, setIsLoading } = useJobs();
  const [skillOptions, setSkillOptions] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string>("full-time");
  const [mobility, setMobility] = useState<string>("remote");
  const [salary, setSalary] = useState<number[]>([
    0,
    import.meta.env.VITE_MAX_SALARY,
  ]);

  useEffect(() => {
    if (allSkills) {
      setSkillOptions(allSkills);
    }
  }, [allSkills]);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  function handleClick() {
    if (
      !title ||
      !description ||
      !company ||
      !country ||
      !skills.length ||
      !jobType ||
      !mobility ||
      !salary
    ) {
      alert("Please fill all the fields");
      return;
    }

    const newJob = {
      id: new Date().getTime(),
      title,
      description,
      skills,
      salary: {
        min: salary[0],
        max: salary[1],
      },
      "job-type": jobType,
      mobility,
      location: {
        lat: position[0],
        lng: position[1],
      },
      company,
      country,
    };
    addJob(newJob);

    setTitle("");
    setDescription("");
    setCompany("");
    setCountry("");
    setSkills([]);
    setJobType("full-time");
    setMobility("remote");
    setSalary([0, import.meta.env.VITE_MAX_SALARY]);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onClick={(e) => e.preventDefault()}>
        <div className={styles.group}>
          <InputLabel
            label="Job Title"
            id="title"
            value={title}
            setValue={setTitle}
          />
        </div>
        <div className={styles.group}>
          <InputLabel
            label="Company"
            id="company"
            value={company}
            setValue={setCompany}
          />

          <InputLabel
            label="Country"
            id="country"
            value={country}
            setValue={setCountry}
          />
        </div>
        <div className={styles.group}>
          <InputLabel
            label="Job description"
            id="description"
            rows={5}
            value={description}
            setValue={setDescription}
          />
        </div>
        <div className={styles.group}>
          <span> min Salary: {salary[0]}$</span>
          <Box sx={{ width: 400 }}>
            <Slider
              min={0}
              max={import.meta.env.VITE_MAX_SALARY}
              step={50}
              getAriaLabel={() => "Salary"}
              value={salary}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value}$`}
              onChange={(_, newValue: number | number[]) => {
                setSalary(newValue as number[]);
              }}
              disabled={isLoading}
            />
          </Box>
          <span> max Salary: {salary[1]}$</span>
        </div>
        <div className={`${styles.group} ${styles.skills}`}>
          <label>Skills</label>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={skillOptions}
            getOptionLabel={(option) => option}
            value={skills}
            onChange={(_, newValue: string[]) => {
              setSkills(newValue);
            }}
            freeSolo
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: "500px", height: "50px", overflowY: "scroll" }}
            className={styles.autocomplete}
            disabled={allSkills == null || isLoading}
          />
        </div>
        <div className={styles.group}>
          <SelectOptions
            label="Job Type"
            id="job-type"
            options={jobTypeOptions}
            value={jobType}
            setValue={setJobType}
          />
        </div>
        <div className={styles.group}>
          <SelectOptions
            label="mobility"
            id="mobility"
            options={mobilityOptions}
            value={mobility}
            setValue={setMobility}
          />
        </div>

        <div className={styles.group}>
          <p style={{ textAlign: "center" }}>
            latitude:{position[0]} longitude:
            {position[1]}
          </p>
        </div>
      </form>

      <button onClick={handleClick} className={styles.button}>
        Post Your Job
      </button>
    </div>
  );
}

export default FormAddJob;
