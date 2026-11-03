export const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"] as const;

export type Category = (typeof CATEGORIES)[number];

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}
