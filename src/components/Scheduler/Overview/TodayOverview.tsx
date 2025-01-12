import React from 'react';
import StatusCard from './StatusCard';
import NotificationsCard from './NotificationsCard';
import QuickSettingsCard from './QuickSettingsCard';
import AppointmentCards from './AppointmentCards';
import RevenueOverviewCard from './RevenueOverviewCard';
import UpcomingBreaksCard from './UpcomingBreaksCard';
import MediaManagementCard from './MediaManagementCard';

const TodayOverview = () => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-4 md:col-span-2 lg:col-span-2">
        <StatusCard />
        <AppointmentCards />
        <MediaManagementCard />
      </div>
      <div className="space-y-4">
        <NotificationsCard />
        <QuickSettingsCard />
        <RevenueOverviewCard />
        <UpcomingBreaksCard />
      </div>
    </div>
  );
};

export default TodayOverview;