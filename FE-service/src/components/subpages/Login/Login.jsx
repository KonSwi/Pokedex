import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/userService";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../shared/Button/Button";
import styles from "./Login.module.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const user = await loginUser(data.email, data.password);

    if (!user) {
      enqueueSnackbar("Niepoprawny email lub hasło", { variant: "error" });
      return;
    }

    login(user);
    enqueueSnackbar("Zalogowano pomyślnie!", { variant: "success" });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Logowanie</h2>

      <input placeholder="Email" {...register("email")} />
      <p className={styles.errorMsg}>{errors.email?.message}</p>

      <input type="password" placeholder="Hasło" {...register("password")} />
      <p className={styles.errorMsg}>{errors.password?.message}</p>

      <Button type="submit" className={styles.loginButton}>
        Zaloguj się
      </Button>
    </form>
  );
};

export default Login;
