import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Imię musi mieć minimum 3 znaki"),
    email: z.string().email("Nieprawidłowy adres email"),
    password: z
      .string()
      .min(8, "Hasło musi mieć min. 8 znaków")
      .regex(/[A-Z]/, "Musi zawierać dużą literę")
      .regex(/[0-9]/, "Musi zawierać cyfrę")
      .regex(/[^A-Za-z0-9]/, "Musi zawierać znak specjalny"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła nie są identyczne",
    path: ["repeatPassword"],
  });
