export interface Appointment {
  id: string;
  clientName: string;
  time: string;
  duration: number;
  service: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface DaySchedule {
  date: Date;
  appointments: Appointment[];
}