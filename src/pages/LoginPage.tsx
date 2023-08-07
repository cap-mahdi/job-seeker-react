import Slogan from "../components/common/Slogan";
import Form from "../components/loginPage/Form";
import styles from "./LoginPage.module.css";
function LoginPage() {
  return (
    <div className={styles.container}>
      <Slogan />
      <Form />
    </div>
  );
}

export default LoginPage;
