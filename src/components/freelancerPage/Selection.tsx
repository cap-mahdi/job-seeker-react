import Select, { SingleValue } from "react-select";

import styles from "./Selection.module.css";
import { useJobs } from "../../contexts/JobContext";
import { useSearchParams } from "react-router-dom";

interface props {
  options: { value: string; label: string }[];
  placeholder?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: { value: string; label: string };

  isDisabled?: boolean;
}

function Selection({
  options,
  placeholder,
  setValue = () => {},
  value = { value: "", label: "" },
  isDisabled,
}: props) {
  const { skills, isLoading, setIsLoading } = useJobs();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  function handleSelectChangeSingle(
    e: SingleValue<{ value: string; label: string }>
  ) {
    if (!e) return;
    if (!id) setIsLoading(true);
    setValue(e.value);
  }

  return (
    <Select
      isDisabled={isDisabled || !skills || isLoading}
      options={options}
      placeholder={placeholder}
      className={styles.select}
      // style={{
      //   width: `${8 * value.value.length + 100}px`,
      // }}
      onChange={handleSelectChangeSingle}
      value={value}
    />
  );
}

export default Selection;
