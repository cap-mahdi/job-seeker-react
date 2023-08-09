import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Job } from "../Types";

interface JobContextType {
  jobs: Job[];
  isLoading: boolean;
  error: string;
  selectedJob: Job | null;
  hoveredJob: Job | null;
  skills: string[] | null;
  countries: string[] | null;
  selectJob: (job: Job | null) => void;
  hoverJob: (job: Job | null) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchJobs: (filter: filter, controller?: AbortController) => Promise<void>;
  fetchJob: (id: number, controller?: AbortController) => Promise<void>;
  addJob: (job: Job) => Promise<void>;
}

const JobContext = createContext<JobContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

interface filter {
  skills?: string[];
  salary?: number[];
  "job-type"?: string[];
  mobility?: string[];
  country?: string;
}

const URL = import.meta.env.VITE_FAKE_API + "/jobAds";

function JobProvider({ children }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [hoveredJob, setHoveredJob] = useState<Job | null>(null);
  const [skills, setSkills] = useState<string[] | null>(null);
  const [countries, setCountries] = useState<string[] | null>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  function filterJobs(
    data: Job[],
    { skills, salary, "job-type": jobType, mobility, country }: filter
  ) {
    const skillsToLowerCase = !skills
      ? []
      : skills.map((skill) => skill.toLowerCase());
    const filteredJobs = data.filter((job) => {
      if (skillsToLowerCase.length > 0) {
        const jobSkills = job.skills.map((skill) => skill.toLowerCase());
        const skillsMatch = skillsToLowerCase.some((skill) =>
          jobSkills.includes(skill)
        );
        if (!skillsMatch) return false;
      }

      if (jobType && jobType.length > 0) {
        const jobTypeMatch = jobType.some(
          (type) => job["job-type"].toLowerCase() === type.toLowerCase()
        );
        if (!jobTypeMatch) return false;
      }

      if (mobility && mobility.length > 0) {
        const mobilityMatch = mobility.some(
          (type) => job && job.mobility.toLowerCase() === type.toLowerCase()
        );
        if (!mobilityMatch) return false;
      }

      if (country && country != "All") {
        if (job.country !== country) return false;
      }

      if (salary) {
        if (job.salary.min < salary[0] || job.salary.max > salary[1])
          return false;
      }

      return true;
    });

    return filteredJobs;
  }

  async function fetchJobs(
    filter: filter,
    controller?: AbortController
  ): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch(URL, { signal: controller?.signal });
      const data = await response.json();
      const filteredJobs = filterJobs(data, filter);
      const isThereSelectedJob = filteredJobs.some(
        (job) => job.id === selectedJob?.id
      );
      if (!isThereSelectedJob) setSelectedJob(null);
      setJobs(filteredJobs);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error(error);
      if (error instanceof Error) setError(error.message);
      setIsLoading(false);
    }
  }

  async function fetchJob(
    id: number,
    controller?: AbortController
  ): Promise<void> {
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/${id}`, {
        signal: controller?.signal,
      });
      const data = await response.json();
      setSelectedJob(data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error(error);
      if (error instanceof Error) setError(error.message);
      setIsLoading(false);
    }
  }

  async function addJob(job: Job): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      await response.json();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  function selectJob(job: Job | null) {
    setSelectedJob(job);
  }

  function hoverJob(job: Job | null) {
    setHoveredJob(job);
  }

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        const skills = data.reduce((acc: string[], job: Job) => {
          job.skills.forEach((skill: string) => {
            if (!acc.includes(skill)) {
              acc.push(skill);
            }
          });
          return acc;
        }, []);
        const countries = data.reduce((acc: string[], job: Job) => {
          if (!acc.includes(job.country)) {
            acc.push(job.country);
          }
          return acc;
        }, []);
        skills.sort();
        countries.sort();
        setCountries(["All", ...countries]);
        setSkills(skills);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSkills();
  }, []);

  useEffect(() => {
    if (id) {
      const controller = new AbortController();
      fetchJob(parseInt(id), controller);
      return () => controller.abort();
    }
  }, [id]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        isLoading,
        setIsLoading,
        error,
        fetchJobs,
        fetchJob,
        addJob,
        skills,
        countries,
        selectJob,
        selectedJob,
        hoveredJob,
        hoverJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

function useJobs() {
  const context = useContext(JobContext);

  if (context === null) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}

export { JobProvider, useJobs };
