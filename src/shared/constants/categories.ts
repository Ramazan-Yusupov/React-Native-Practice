import { Category } from "../types/types";

export const CATEGORIES: Record<
  Category,
  { label: string; color: string; bgColor: string; emoji: string }
> = {
  work: {
    label: "Работа",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    emoji: "💼",
  },
  personal: {
    label: "Личное",
    color: "text-green-600",
    bgColor: "bg-green-100",
    emoji: "🏠",
  },
  urgent: {
    label: "Срочно",
    color: "text-red-600",
    bgColor: "bg-red-100",
    emoji: "🔥",
  },
  ideas: {
    label: "Идеи",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    emoji: "",
  },
};
