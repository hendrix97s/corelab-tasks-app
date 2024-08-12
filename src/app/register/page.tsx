"use client";

import { type Metadata } from "next";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import {
  storeUserSchema,
  storeUserSchemaFormProps,
} from "@/validations/user-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/use-auth";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { userRegister } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<storeUserSchemaFormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(storeUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleStoreUser = useCallback(
    async (data: storeUserSchemaFormProps) => {
      userRegister(data).then((value) => {
        router.push(`/workspace/${value.workspace.id}`);
      });
    },
    [router]
  );

  return (
    <AuthLayout
      title="Crie uma conta"
      subtitle={
        <>
          Já possui uma conta?{" "}
          <Link href="/login" className="text-cyan-600">
            Entre
          </Link>{" "}
          com sua conta.
        </>
      }
    >
      {" "}
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="flex flex-col gap-6">
        <Label className="w-full">
          <span>Nome</span>
          <Input
            {...register("name")}
            required
            className="col-span-full bg-shark-800 border-shark-700 my-1.5"
          />
          {errors.name?.message && (
            <span className="text-red-500 mt-2">{errors.name.message}</span>
          )}
        </Label>

        <Label className="w-full">
          <span>Email</span>
          <Input
            {...register("email")}
            type="email"
            required
            className="col-span-full bg-shark-800 border-shark-700 my-1.5"
          />
          {errors.email?.message && (
            <span className="text-red-500 mt-2">{errors.email.message}</span>
          )}
        </Label>

        <Label className="w-full">
          <span>Senha</span>
          <Input
            {...register("password")}
            required
            className="col-span-full bg-shark-800 border-shark-700 my-1.5"
          />
          {errors.password?.message && (
            <span className="text-red-500 mt-2">{errors.password.message}</span>
          )}
        </Label>

        <Label className="w-full">
          <span>Confirmar senha</span>
          <Input
            {...register("password_confirmation")}
            required
            className="col-span-full bg-shark-800 border-shark-700 my-1.5"
          />
          {errors.password_confirmation?.message && (
            <span className="text-red-500 mt-2">
              {errors.password_confirmation.message}
            </span>
          )}
        </Label>
      </div>
      <Button className="mt-8 w-full" onClick={handleSubmit(handleStoreUser)}>
        Cadastrar
      </Button>
    </AuthLayout>
  );
}
