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
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <div className="order-2 sm:order-2">
          <BurgerMenu />
        </div>
        <div className="flex items-center gap-3 order-1 sm:order-1">
          <h1 className="text-xl sm:text-2xl font-bold text-scheduler-text">לוח פגישות</h1>
          <div className="block sm:hidden">
            <Tabs 
              value={view} 
              onValueChange={(value) => onViewChange(value as 'daily' | 'overview')}
              className="h-8"
            >
              <TabsList className="h-8 p-1">
                <TabsTrigger 
                  value="daily"
                  className={cn(
                    "h-6 w-6 p-0",
                    "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
                  )}
                >
                  <CalendarDays className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger 
                  value="overview"
                  className={cn(
                    "h-6 w-6 p-0",
                    "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Desktop view toggle */}
      <Tabs 
        value={view} 
        onValueChange={(value) => onViewChange(value as 'daily' | 'overview')}
        className="hidden sm:block"
      >
        <TabsList className="grid grid-cols-2 h-11">
          <TabsTrigger 
            value="daily"
            className={cn(
              "flex items-center gap-2 px-4",
              "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
            )}
          >
            <CalendarDays className="h-5 w-5" />
            <span>תצוגה יומית</span>
          </TabsTrigger>
          <TabsTrigger 
            value="overview"
            className={cn(
              "flex items-center gap-2 px-4",
              "data-[state=active]:bg-scheduler-blue data-[state=active]:text-white"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>תצוגה כללית</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SchedulerHeader;