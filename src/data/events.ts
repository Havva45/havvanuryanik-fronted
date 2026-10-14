import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Yapay Zeka ve Gelecek Semineri",
    category: "Seminer",
    capacity: 100,
    date: "2026-11-10",
    time: "14:00",
    location: "Mühendislik Amfisi 1",
    description: "Yapay zeka teknolojilerinin gelecekteki rolleri ve kariyer fırsatları üzerine söyleşi.",
    image: "/afis1.svg"
  },
  {
    id: "event-2",
    title: "React & TypeScript Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-12",
    time: "10:00",
    location: "Bilgisayar Lab 2",
    description: "Sıfırdan React ve TypeScript ile modern web uygulamaları geliştirme pratikleri.",
    image: "/afis1.svg"
  },
  {
    id: "event-3",
    title: "Girişimcilik Söyleşisi",
    category: "Söyleşi",
    capacity: 50,
    date: "2026-11-15",
    time: "15:30",
    location: "Kültür Merkezi Salon A",
    description: "Başarılı girişimcilerle deneyim paylaşımı ve soru-cevap oturumu.",
    image: "/afis1.svg"
  },
  {
    id: "event-4",
    title: "Siber Güvenlik Hackathonu",
    category: "Yarışma",
    capacity: 80,
    date: "2026-11-20",
    time: "09:00",
    location: "Merkez Kütüphane",
    description: "24 saat sürecek güvenlik ve bayrağı yakala (CTF) yarışması.",
    image: "/afis1.svg"
  },
  {
    id: "event-5",
    title: "Mobil Uygulama Geliştirme",
    category: "Atölye",
    capacity: 25,
    date: "2026-11-22",
    time: "13:00",
    location: "Bilgisayar Lab 1",
    description: "Flutter ile çapraz platform mobil uygulama geliştirme eğitimi.",
    image: "/afis1.svg"
  },
  {
    id: "event-6",
    title: "Kariyer Zirvesi 2026",
    category: "Seminer",
    capacity: 150,
    date: "2026-11-25",
    time: "11:00",
    location: "Ana Konferans Salonu",
    description: "Sektör lideri şirketlerle tanışma ve staj/iş imkanları.",
    image: "/afis1.svg"
  }
];