import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import BurgerMenu from "./BurgerMenu";

interface SchedulerHeaderProps {
  view: 'daily' | 'overview';
  onViewChange: (view: 'daily' | 'overview') => void;
}

const SchedulerHeader = ({ view, onViewChange }: SchedulerHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-scheduler-text">לוח פגישות</h1>
        <BurgerMenu />
      </div>
      
      <Tabs 
        value={view} 
        onValueChange={(value) => onViewChange(value as 'daily' | 'overview')}
        className="self-end sm:self-auto"
      >
        <TabsList className="h-9">
          <TabsTrigger 
            value="daily"
            className={cn(
              "flex items-center gap-1.5 px-3 text-sm",
              "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
            )}
          >
            <CalendarDays className="h-4 w-4" />
            <span>יומי</span>
          </TabsTrigger>
          <TabsTrigger 
            value="overview"
            className={cn(
              "flex items-center gap-1.5 px-3 text-sm",
              "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>כללי</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SchedulerHeader;