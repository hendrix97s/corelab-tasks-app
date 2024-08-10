import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const handleGetFirstChar = (text: string) => {
  return text ? text.charAt(0) : "";
};

export const handleImageSizeValidate = (
  file: FileList,
  maxImageSize: number,
  optional?: boolean
) => {
  try {
    if (optional && file.length === 0) return true;
    if (file.length === 0) return false;
    return file[0].size < maxImageSize;
  } catch (error: any) {
    return false;
  }
};

export const handleImageTypeValidate = (
  file: FileList,
  acceptedImageTypes: string[],
  optional?: boolean
) => {
  try {
    if (optional && file.length === 0) return true;
    if (file.length === 0) return false;
    return acceptedImageTypes.includes(file[0].type);
  } catch (error) {
    return false;
  }
};

export const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigitoVerificador = 11 - (soma % 11);
  if (primeiroDigitoVerificador >= 10) primeiroDigitoVerificador = 0;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigitoVerificador = 11 - (soma % 11);
  if (segundoDigitoVerificador >= 10) segundoDigitoVerificador = 0;

  return (
    primeiroDigitoVerificador === parseInt(cpf.charAt(9)) &&
    segundoDigitoVerificador === parseInt(cpf.charAt(10))
  );
};
