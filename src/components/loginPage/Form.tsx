import { useState } from "react";
import styles from "./Form.module.css";
import InputLabel from "./InputLabel";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
function Form() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/mode");
    } catch (err: Error) {
      setError(err.message);
    }
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <InputLabel
        label="Email"
        type="email"
        id="email"
        value={email}
        setValue={setEmail}
      />
      <InputLabel
        label="Password"
        type="password"
        id="password"
        value={password}
        setValue={setPassword}
      />
      <button className={styles.button}>Login</button>
    </form>
  );
}

export default Form;
