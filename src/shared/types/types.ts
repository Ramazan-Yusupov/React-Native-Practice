export type Category = "work" | "personal" | "urgent" | "ideas";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  category: Category;
};
