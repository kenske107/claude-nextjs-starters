import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind 클래스를 조건부로 합치고 충돌을 해결하는 유틸
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
