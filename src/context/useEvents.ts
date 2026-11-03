import { useContext } from "react";
import { EventContext } from "./event-context";

export function useEvents() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvents, EventProvider içinde kullanılmalı.");
  return ctx;
}
