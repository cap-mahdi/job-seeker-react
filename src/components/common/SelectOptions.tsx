import { useJobs } from "../../contexts/JobContext";
import styles from "./SelectOptions.module.css";

interface props {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  value?: string;
  setValue?: (value: string) => void;
  disabled?: boolean;
}
function SelectOptions({
  label,
  options,
  value = "",

  setValue = () => {},
}: props) {
  const { isLoading } = useJobs();
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{label}: </h3>
      <select
        className={styles.options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOptions;
