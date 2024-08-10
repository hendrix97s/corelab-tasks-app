import {
  handleImageSizeValidate,
  handleImageTypeValidate,
  validarCPF,
} from "@/lib/utils";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES_AVATAR = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 1028 * 1028 * 5;

export const signInUserSchema = z.object({
  email: z
    .string()
    .email("Deve informar um email válido")
    .nonempty("O campo de email é obrigatório"),
  password: z
    .string()
    .min(8, "O campo de senha deve conter no mínimo 8 caracteres")
    .nonempty("O campo de senha é obrigatório"),
  remember: z.boolean().optional(),
});

export const storeUserSchema = z
  .object({
    name: z.string().nonempty("O campo Nome é obrigatório."),
    role: z.string().nonempty("O campo Role é obrigatório."),

    email: z
      .string()
      .email("Email inválido")
      .nonempty("O campo Email é obrigatório."),

    password: z
      .string()
      .min(8, "O campo de senha deve conter no mínimo 8 caracteres")
      .nonempty("O campo de senha é obrigatório"),
    password_confirmation: z
      .string()
      .min(8, "O campo de senha deve conter no mínimo 8 caracteres")
      .nonempty("O campo de senha é obrigatório"),
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "A confirmação se senha é diferente de senha.",
      path: ["password_confirmation"],
    }
  );

export const updateUserSchema = z
  .object({
    current_password: z
      .string()
      .nonempty("O campo de senha atual é obrigatório"),
    password: z
      .string()
      .min(8, "O campo de senha deve conter no mínimo 8 caracteres")
      .nonempty("O campo de senha é obrigatório"),
    password_confirmation: z
      .string()
      .min(8, "O campo de senha deve conter no mínimo 8 caracteres")
      .nonempty("O campo de senha é obrigatório"),
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "A confirmação se senha é diferente de senha.",
      path: ["password_confirmation"],
    }
  );

export const signUpUserSchema = z
  .object({
    name: z.string().nonempty("O campo Nome é obrigatório."),
    email: z
      .string()
      .email("Email inválido")
      .nonempty("O campo Email é obrigatório."),
    password: z.string().nonempty("O campo de senha é obrigatório"),
    password_confirmation: z
      .string()
      .nonempty("O Campo confirmar senha é obrigatório."),
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "A confirmação se senha é diferente de senha",
      path: ["password_confirmation"],
    }
  );

export const updateAvatarUserSchema = z.object({
  avatar: z
    .any()
    .refine(
      (file: FileList) =>
        handleImageTypeValidate(file, ACCEPTED_IMAGE_TYPES_AVATAR),
      "O Arquivo deve ser uma imagem do tipo PNG, JPG e JPEG"
    )
    .refine(
      (file: FileList) => handleImageSizeValidate(file, MAX_IMAGE_SIZE),
      "O Arquivo deve ser uma imagem e ter no máximo 5MB."
    ),
});

export type signInUserSchemaFormProps = z.infer<typeof signInUserSchema>;
export type updateUserSchemaFormProps = z.infer<typeof updateUserSchema>;
export type storeUserSchemaFormProps = z.infer<typeof storeUserSchema>;

export type signUpUserSchemaFormProps = z.infer<typeof signUpUserSchema>;
export type updateAvatarUserSchemaProps = z.infer<
  typeof updateAvatarUserSchema
>;
