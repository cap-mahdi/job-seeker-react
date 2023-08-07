

export function getColor(skills: string[], fakeUser): {
    percentage: number;
    color: string;
    } {
    let matchedSkills = 0;
  skills.forEach((skill) => {
    if (fakeUser.skills.includes(skill)) matchedSkills++;
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