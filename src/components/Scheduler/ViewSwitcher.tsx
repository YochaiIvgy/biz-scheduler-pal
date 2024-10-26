import { LayoutDashboard, CalendarDays } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewSwitcherProps {
  view: 'daily' | 'overview';
  onViewChange: (view: 'daily' | 'overview') => void;
}

const ViewSwitcher = ({ view, onViewChange }: ViewSwitcherProps) => {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(value) => value && onViewChange(value as 'daily' | 'overview')}
      className="border rounded-lg p-1 bg-white"
    >
      <ToggleGroupItem
        value="daily"
        aria-label="תצוגה יומית"
        className="flex items-center gap-2 data-[state=on]:bg-scheduler-blue data-[state=on]:text-white px-4"
      >
        <CalendarDays className="h-4 w-4" />
        <span className="hidden sm:inline">תצוגה יומית</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="overview"
        aria-label="תצוגה כללית"
        className="flex items-center gap-2 data-[state=on]:bg-scheduler-blue data-[state=on]:text-white px-4"
      >
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden sm:inline">תצוגה כללית</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewSwitcher;