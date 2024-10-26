import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Plus,
  Clock,
  User,
  List,
  Bell,
  BarChart,
  CreditCard,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BurgerMenu = () => {
  const { toast } = useToast();

  const handleItemClick = (item: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `The ${item} feature will be available soon.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>תפריט ניהול</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleItemClick("Appointment Overview")}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>סקירת פגישות</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("New Appointment")}>
          <Plus className="mr-2 h-4 w-4" />
          <span>פגישה חדשה</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("Appointment Status")}>
          <Clock className="mr-2 h-4 w-4" />
          <span>סטטוס פגישות</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("Customer Details")}>
          <User className="mr-2 h-4 w-4" />
          <span>פרטי לקוחות</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleItemClick("Services List")}>
          <List className="mr-2 h-4 w-4" />
          <span>רשימת שירותים</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("Availability & Breaks")}>
          <Clock className="mr-2 h-4 w-4" />
          <span>זמינות והפסקות</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleItemClick("Notifications & Reminders")}>
          <Bell className="mr-2 h-4 w-4" />
          <span>התראות ותזכורות</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("Reports & Analytics")}>
          <BarChart className="mr-2 h-4 w-4" />
          <span>דוחות וניתוחים</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("Payment & Invoicing")}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>תשלומים וחשבוניות</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleItemClick("Policies")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>מדיניות</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BurgerMenu;