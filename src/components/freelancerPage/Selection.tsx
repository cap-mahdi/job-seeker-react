import Select from "react-select";
import styles from "./Selection.module.css";
import { useJobs } from "../../contexts/JobContext";
import { useSearchParams } from "react-router-dom";

interface props {
  options: { value: string; label: string }[];
  isMulti?: boolean;
  placeholder?: string;
  setValue?: (value) => void;
  value?: { value: string; label: string }[] | { value: string; label: string };

  isDisabled?: boolean;
}

function Selection({
  options,
  isMulti = true,
  placeholder,
  setValue,
  value,
  isDisabled,
}: props) {
  const { skills, isLoading, setIsLoading } = useJobs();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return (
    <Select
      isDisabled={isDisabled || !skills || isLoading}
      options={options}
      placeholder={placeholder}
      className={styles.select}
      isMulti={isMulti}
      style={{ width: `${8 * value.length + 100}px` }}
      onChange={(e) => {
        if (!id) setIsLoading(true);
        if (e.length === options.length) {
          setValue(isMulti ? [] : "");
          return;
        }
        if (isMulti) setValue(e.map((item) => item.value));
        else setValue(e.value);
      }}
      value={value}
    />
  );
}

export default Selection;
