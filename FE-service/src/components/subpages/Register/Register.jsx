import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { registerUser, doesEmailExist } from "../../../services/userService";
import Button from "../../shared/Button/Button";
import styles from "./Register.module.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const exists = await doesEmailExist(data.email);

    if (exists) {
      enqueueSnackbar("Użytkownik z tym adresem email już istnieje", {
        variant: "error",
      });
      return;
    }

    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    enqueueSnackbar("Zarejestrowano pomyślnie!", { variant: "success" });
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Rejestracja</h2>

      <input placeholder="Imię" {...register("name")} />
      <p className={styles.errorMsg}>{errors.name?.message}</p>

      <input placeholder="Email" {...register("email")} />
      <p className={styles.errorMsg}>{errors.email?.message}</p>

      <input type="password" placeholder="Hasło" {...register("password")} />
      <p className={styles.errorMsg}>{errors.password?.message}</p>

      <input
        type="password"
        placeholder="Powtórz hasło"
        {...register("repeatPassword")}
      />
      <p className={styles.errorMsg}>{errors.repeatPassword?.message}</p>

      <Button type="submit">Zarejestruj się</Button>
    </form>
  );
};

export default Register;
