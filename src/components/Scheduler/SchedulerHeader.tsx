import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchedulerHeaderProps {
  view: 'daily' | 'overview';
  onViewChange: (view: 'daily' | 'overview') => void;
}

const SchedulerHeader = ({ view, onViewChange }: SchedulerHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold text-scheduler-text">לוח פגישות</h1>
      
      <Tabs 
        value={view} 
        onValueChange={(value) => onViewChange(value as 'daily' | 'overview')}
        className="w-full sm:w-auto"
      >
        <TabsList className="w-full sm:w-auto grid grid-cols-2 h-11">
          <TabsTrigger 
            value="daily"
            className={cn(
              "flex items-center gap-2 px-4",
              "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
            )}
          >
            <CalendarDays className="h-5 w-5" />
            <span className="hidden sm:inline">תצוגה יומית</span>
          </TabsTrigger>
          <TabsTrigger 
            value="overview"
            className={cn(
              "flex items-center gap-2 px-4",
              "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="hidden sm:inline">תצוגה כללית</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SchedulerHeader;