import Select, { SingleValue } from "react-select";

import styles from "./Selection.module.css";
import { useJobs } from "../../contexts/JobContext";
import { useSearchParams } from "react-router-dom";

interface props {
  options: option[];
  placeholder?: string;
  setValue?: React.Dispatch<React.SetStateAction<string[]>>;
  value?: option[];

  isDisabled?: boolean;
}
interface option {
  value: string;
  label: string;
}
function SelectionMultiple({
  options,
  placeholder,
  setValue = () => {},
  value = [{ value: "", label: "" }],
  isDisabled,
}: props) {
  const { skills, isLoading, setIsLoading } = useJobs();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  function handleSelectChangeMultiple(e: SingleValue<option>) {
    if (!e) return;
    if (!id) setIsLoading(true);

    // if (e.length === options.length) {
    //   setValue([]);
    //   return;
    // }
    setValue((old) => [...old, e.value]);
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
      onChange={handleSelectChangeMultiple}
      value={value}
    />
  );
}

export default SelectionMultiple;
