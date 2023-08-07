import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const JobContext = createContext(null);

interface props {
  children: React.ReactNode;
}

interface filter {
  skills?: string[];
  salary?: number[2];
  "job-type"?: string[];
  mobility?: string[];
  country?: string[];
}

const URL = import.meta.env.VITE_FAKE_API + "/jobAds";

function JobProvider({ children }: props) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [hoveredJob, setHoveredJob] = useState(null);
  /*options*/
  const [skills, setSkills] = useState<string[] | null>(null);
  const [countries, setCountries] = useState<string[] | null>(null);
  /*url params*/
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  function filterJobs(
    data,
    { skills, salary, "job-type": jobType, mobility, country }: filter
  ) {
    const skillsToLowerCase = skills.map((skill) => skill.toLowerCase());
    const filteredJobs = data.filter((job) => {
      if (skillsToLowerCase.length > 0) {
        const jobSkills = job.skills.map((skill) => skill.toLowerCase());
        const skillsMatch = skillsToLowerCase.some((skill) =>
          jobSkills.includes(skill)
        );
        if (!skillsMatch) return false;
      }

      if (jobType.length > 0) {
        const jobTypeMatch = jobType.some(
          (type) => job["job-type"].toLowerCase() === type.toLowerCase()
        );
        if (!jobTypeMatch) return false;
      }

      if (mobility.length > 0) {
        const mobilityMatch = mobility.some(
          (type) => job.mobility.toLowerCase() === type.toLowerCase()
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
  ): Promise<() => void> {
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
      if (error.name === "AbortError") {
        return;
      }
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  }
  async function fetchJob(id: number, controller?: AbortController) {
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/${id}`, {
        signal: controller?.signal,
      });
      const data = await response.json();
      setSelectedJob(data);
      setIsLoading(false);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  }

  async function addJob(job) {
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

  function selectJob(job) {
    setSelectedJob(job);
  }
  function hoverJob(job) {
    setHoveredJob(job);
  }

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        const skills = data.reduce((acc, job) => {
          job.skills.forEach((skill) => {
            if (!acc.includes(skill)) {
              acc.push(skill);
            }
          });
          return acc;
        }, []);
        const countries = data.reduce((acc, job) => {
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

  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}

export { JobProvider, useJobs };
