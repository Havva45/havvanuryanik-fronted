import { createContext } from "react";
import type { CampusEvent } from "../types/campus-event";

export type NewEvent = Omit<CampusEvent, "id">;

export interface EventContextValue {
  events: CampusEvent[];
  addEvent: (data: NewEvent) => CampusEvent;
  updateEvent: (id: string, data: NewEvent) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => CampusEvent | undefined;
}

export const EventContext = createContext<EventContextValue | null>(null);
