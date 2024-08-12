"use client";

import { type Metadata } from "next";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  signInUserSchema,
  signInUserSchemaFormProps,
} from "@/validations/user-validate";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date } from "zod";
import { useAuth } from "@/contexts/use-auth";
import { useCallback } from "react";
import { routeModule } from "next/dist/build/templates/app-page";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInUserSchemaFormProps>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleAuthenticate = useCallback(
    async (data: signInUserSchemaFormProps) => {
      const response = await login(data);
      if (response) router.push(`/workspace/${response.workspace.id}`);
    },
    [login, router]
  );

  return (
    <AuthLayout
      title="Entre com sua conta"
      subtitle={
        <>
          Ainda não possui uma conta?{" "}
          <Link href="/register" className="text-electric-violet-500">
            Cadastre-se
          </Link>{" "}
          é gratuito.
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Label className="space-y-1.5">
          <span>Email</span>
          <Input
            {...register("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-shark-800 border-shark-800/50"
          />
        </Label>
        <Label className="space-y-1.5">
          <span>Senha</span>
          <Input
            {...register("password")}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="bg-shark-800 border-shark-800/50"
          />
        </Label>
        <Button
          type="submit"
          color=""
          className="mt-2 w-full"
          onClick={handleSubmit(handleAuthenticate)}
        >
          Entrar
        </Button>
      </div>
    </AuthLayout>
  );
}
