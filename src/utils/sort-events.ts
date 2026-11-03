import type { CampusEvent } from "../types/campus-event";

export function sortByDate(list: CampusEvent[]): CampusEvent[] {
  return [...list].sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
  );
}
