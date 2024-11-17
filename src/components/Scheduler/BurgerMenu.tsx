import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
  Settings,
  Users,
  CalendarDays,
  MessageSquare,
  Palette,
  Shield,
  Building2,
  Smartphone,
  Mail,
  Share2,
  HelpCircle,
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
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>תפריט ניהול</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              <span>ניהול לקוחות</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleItemClick("Customer List")}>
                <User className="mr-2 h-4 w-4" />
                <span>רשימת לקוחות</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Customer Groups")}>
                <Users className="mr-2 h-4 w-4" />
                <span>קבוצות לקוחות</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Customer History")}>
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>היסטוריית לקוחות</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Customer Communication")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>תקשורת עם לקוחות</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <List className="mr-2 h-4 w-4" />
              <span>ניהול שירותים</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleItemClick("Services List")}>
                <List className="mr-2 h-4 w-4" />
                <span>רשימת שירותים</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Service Packages")}>
                <Plus className="mr-2 h-4 w-4" />
                <span>חבילות שירות</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Service Pricing")}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>תמחור שירותים</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Availability & Breaks")}>
            <Clock className="mr-2 h-4 w-4" />
            <span>זמינות והפסקות</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleItemClick("Notifications")}>
            <Bell className="mr-2 h-4 w-4" />
            <span>התראות ותזכורות</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleItemClick("Reports")}>
            <BarChart className="mr-2 h-4 w-4" />
            <span>דוחות וניתוחים</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleItemClick("Payments")}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>תשלומים וחשבוניות</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              <span>הגדרות מערכת</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleItemClick("Business Details")}>
                <Building2 className="mr-2 h-4 w-4" />
                <span>פרטי העסק</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Appearance")}>
                <Palette className="mr-2 h-4 w-4" />
                <span>עיצוב ומראה</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Security")}>
                <Shield className="mr-2 h-4 w-4" />
                <span>אבטחה והרשאות</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Integrations")}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>חיבורים וממשקים</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("SMS Settings")}>
                <Smartphone className="mr-2 h-4 w-4" />
                <span>הגדרות SMS</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleItemClick("Email Settings")}>
                <Mail className="mr-2 h-4 w-4" />
                <span>הגדרות דוא״ל</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("Help & Support")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>עזרה ותמיכה</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleItemClick("Policies")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>מדיניות ותנאים</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BurgerMenu;