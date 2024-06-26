import { useJobs } from "../../contexts/JobContext";
import styles from "./InputLabel.module.css";
interface props {
  label: string;
  type?: string;
  id: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  rows?: number;
  disabled?: boolean;
}
function InputLabel({
  label,
  type = "text",
  id,
  value,
  setValue = () => {},
  rows = 0,
  disabled = false,
}: props) {
  const { isLoading } = useJobs();

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}:</label>
      {!rows ? (
        <input
          type={type}
          id={id}
          value={value}
          onChange={handleChange}
          disabled={isLoading || disabled}
        />
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          rows={rows}
          cols={50}
          disabled={isLoading || disabled}
        />
      )}
    </div>
  );
}

export default InputLabel;
