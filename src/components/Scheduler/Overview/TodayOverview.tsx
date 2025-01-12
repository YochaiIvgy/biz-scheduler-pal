import React from 'react';
import StatusCard from './StatusCard';
import NotificationsCard from './NotificationsCard';
import QuickSettingsCard from './QuickSettingsCard';
import AppointmentCards from './AppointmentCards';
import RevenueOverviewCard from './RevenueOverviewCard';
import UpcomingBreaksCard from './UpcomingBreaksCard';
import { DaySchedule } from '@/lib/types';

interface TodayOverviewProps {
  todaySchedule: DaySchedule;
}

const TodayOverview = ({ todaySchedule }: TodayOverviewProps) => {
  // Calculate status counts
  const approvedCount = todaySchedule.appointments.filter(apt => apt.status === 'approved').length;
  const pendingCount = todaySchedule.appointments.filter(apt => apt.status === 'pending').length;
  const rejectedCount = todaySchedule.appointments.filter(apt => apt.status === 'rejected').length;

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-4 md:col-span-2 lg:col-span-2">
        <div className="grid grid-cols-3 gap-4">
          <StatusCard status="approved" count={approvedCount} />
          <StatusCard status="pending" count={pendingCount} />
          <StatusCard status="rejected" count={rejectedCount} />
        </div>
        <AppointmentCards days={[todaySchedule]} />
      </div>
      <div className="space-y-4">
        <NotificationsCard days={[todaySchedule]} />
        <QuickSettingsCard />
        <RevenueOverviewCard days={[todaySchedule]} />
        <UpcomingBreaksCard />
      </div>
    </div>
  );
};

export default TodayOverview;