export interface Appointment {
  id: string;
  clientName: string;
  time: string;
  duration: number;
  service: string;
}

export interface DaySchedule {
  date: Date;
  appointments: Appointment[];
}