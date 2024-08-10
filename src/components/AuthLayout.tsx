import Link from "next/link";

import { CirclesBackground } from "@/components/CirclesBackground";
import { Logo } from "@/components/Logo";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen overflow-hidden pt-16 sm:py-28 bg-shark-950 relative">
      <CirclesBackground
        width="1090"
        height="1090"
        className="absolute -top-7 left-1/2  h-[788px] -translate-x-1/2 stroke-electric-violet-500/50 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-28 sm:h-auto"
      />
      <div className="z-50 mx-auto flex justify-center w-full  max-w-2xl flex-col px-4 sm:px-6 ">
        <div className="">
          <Link href="/" aria-label="Home" className="flex justify-center">
            <Logo className="mx-auto h-12 w-auto" />
          </Link>
          <div className="mt-8 sm:mt-8">
            <h1 className="text-center text-2xl font-medium tracking-tight text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-center text-lg text-shark-300">
                {subtitle}
              </p>
            )}
          </div>
          <div className="-mx-4 mt-10 flex-auto bg-shark-900 rounded-lg px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
