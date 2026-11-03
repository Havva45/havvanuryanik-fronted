import { useEffect, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent } from "../types/campus-event";
import { EventContext, type NewEvent } from "./event-context";

const STORAGE_KEY = "kampus-etkinlikleri";

function loadEvents(): CampusEvent[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as CampusEvent[];
  } catch {
    // localStorage kullanılamıyorsa başlangıç verisiyle devam et
  }
  return initialEvents;
}

function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(loadEvents);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // kaydedilemezse sessizce geç
    }
  }, [events]);

  function addEvent(data: NewEvent) {
    const created: CampusEvent = { ...data, id: `event-${Date.now()}` };
    setEvents((list) => [...list, created]);
    return created;
  }

  function updateEvent(id: string, data: NewEvent) {
    setEvents((list) =>
      list.map((e) => (e.id === id ? { ...e, ...data, id } : e))
    );
  }

  function deleteEvent(id: string) {
    setEvents((list) => list.filter((e) => e.id !== id));
  }

  function getEvent(id: string) {
    return events.find((e) => e.id === id);
  }

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent, getEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventProvider;
