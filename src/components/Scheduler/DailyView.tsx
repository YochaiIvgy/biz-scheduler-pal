
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CalendarIcon, RefreshCw, Coffee } from "lucide-react";
import { DaySchedule } from "@/lib/types";
import AppointmentList from "./AppointmentList";
import DaysList from "./DaysList";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";

interface DailyViewProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  selectedDaySchedule: DaySchedule;
  sampleDays: DaySchedule[];
  getAppointmentsCount: (date: Date) => number;
}

const DailyView = ({
  selectedDate,
  setSelectedDate,
  showCalendar,
  setShowCalendar,
  selectedDaySchedule,
  sampleDays,
  getAppointmentsCount
}: DailyViewProps) => {
  const { toast } = useToast();
  
  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleAddBreak = () => {
    toast({
      title: "הפסקה נוספה",
      description: "ההפסקה נוספה בהצלחה ללוח הזמנים",
    });
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousDay}
            className="flex-none"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="h-4 w-4" />
            {selectedDate.toLocaleDateString('he-IL', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextDay}
            className="flex-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {showCalendar && (
          <div className="bg-white rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex justify-end gap-2 mb-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.location.reload()}
                className="flex-none"
                title="רענן פגישות"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-none"
                    title="הוסף הפסקה"
                  >
                    <Coffee className="h-4 w-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>הוספת הפסקה</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <Button onClick={handleAddBreak} className="w-full">
                      הוסף הפסקה
                    </Button>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => {
                  const count = getAppointmentsCount(date);
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span>{date.getDate()}</span>
                      {count > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                        >
                          {count}
                        </Badge>
                      )}
                    </div>
                  );
                },
              }}
            />
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-4">
        <div className="hidden lg:block">
          <DaysList
            days={sampleDays}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        <div className="space-y-4">
          <div className="hidden lg:flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousDay}
              className="flex-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="flex-1 text-center font-medium">
              {selectedDate.toLocaleDateString('he-IL', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextDay}
              className="flex-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-none"
                  title="הוסף הפסקה"
                >
                  <Coffee className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>הוספת הפסקה</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <Button onClick={handleAddBreak} className="w-full">
                    הוסף הפסקה
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <AppointmentList
            appointments={selectedDaySchedule.appointments}
            date={selectedDate}
          />
        </div>
      </div>
    </>
  );
};

export default DailyView;
