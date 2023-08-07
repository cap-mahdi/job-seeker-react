import { useState, useEffect } from "react";

import styles from "./Filters.module.css";
import Selection from "./Selection";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useJobs } from "../../contexts/JobContext";
import { useSearchParams } from "react-router-dom";
const jobTypeOptions = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-time", label: "Part-Time" },
  { value: "Internship", label: "Internship" },
];

const availabilityOptions = [
  { value: "On-site", label: "on-site" },
  { value: "Remote", label: "remote" },
  { value: "Hybrid", label: "hybrid" },
];

function convertArrayToOptions(array: string[]) {
  return array.map((item) => ({ value: item, label: item }));
}
function convertStringToOptions(s: string) {
  return { value: s, label: s };
}

interface props {
  skills: string[];
  setSkills: (skills: string[]) => void | ((skills: string[]) => string[]);
}
function Filters({ skills, setSkills }: props) {
  const { fetchJobs, skills: allSkills, countries: allCountries } = useJobs();
  const [country, setCountry] = useState("All");
  const [jobType, setJobType] = useState([]);
  const [mobility, setMobility] = useState([]);
  const [salary, setSalary] = useState<number[]>([
    0,
    Number(import.meta.env.VITE_MAX_SALARY),
  ]);
  /*options*/

  const [skillOptions, setSkillOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [countriesOptions, setCountriesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  /*url params*/
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (allSkills) {
      setCountriesOptions(convertArrayToOptions(allCountries));
      setSkillOptions(convertArrayToOptions(allSkills));
    }
  }, [allSkills, setSkillOptions]);

  useEffect(() => {
    if (id) {
      return;
    }
    const controller = new AbortController();
    fetchJobs(
      {
        skills,
        country,
        "job-type": jobType,
        mobility,
        salary,
      },
      controller
    );
    return () => controller.abort();
  }, [skills, country, jobType, mobility, salary, id]);

  return (
    <div className={styles.container}>
      <h2>...Filters...</h2>
      <div className={styles.filters}>
        <Selection
          options={skillOptions}
          placeholder="search for skill ..."
          setValue={setSkills}
          value={convertArrayToOptions(skills)}
        />
        <Selection
          options={countriesOptions}
          placeholder="choose country ..."
          setValue={setCountry}
          isMulti={false}
          value={convertStringToOptions(country)}
        />
        <Selection
          options={jobTypeOptions}
          placeholder="job-type"
          setValue={setJobType}
          value={convertArrayToOptions(jobType)}
        />
        <Selection
          options={availabilityOptions}
          placeholder="onsite-remote"
          setValue={setMobility}
          value={convertArrayToOptions(mobility)}
        />
        <div className={styles.slider}>
          <span> min Salary: {salary[0]}$</span>
          <Box sx={{ width: 400 }}>
            <Slider
              min={0}
              max={Number(import.meta.env.VITE_MAX_SALARY)}
              step={50}
              getAriaLabel={() => "Salary"}
              value={salary}
              onChange={(e, newValue) => setSalary(newValue)}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value}$`}
            />
          </Box>
          <span> max Salary: {salary[1]}$</span>
        </div>
      </div>
    </div>
  );
}

export default Filters;
