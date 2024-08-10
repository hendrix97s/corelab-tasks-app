import { type Metadata } from "next";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "login",
};

export default function Login() {
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
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="bg-shark-800 border-shark-800/50"
          />
        </Label>
        <Button type="submit" color="" className="mt-2 w-full">
          Entrar
        </Button>
      </div>
    </AuthLayout>
  );
}
