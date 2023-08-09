import { User } from "../../Types";


export function getColor(skills: string[] , user:User | null): {
    percentage: number;
    color: string;
    } {
    let matchedSkills = 0;
  skills.forEach((skill) => {
    if (user && user.skills.includes(skill)) matchedSkills++;
  });
  const percentage = Math.ceil((matchedSkills / skills.length) * 100);
  const color =
    percentage > 66
      ? "#32f032"
      : percentage > 33
      ? "orange"
      : "red";
    return {percentage, color}

}