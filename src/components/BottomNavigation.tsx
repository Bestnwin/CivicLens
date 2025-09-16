import { Home, FileText, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "issues", label: "Issues", icon: Search },
  { id: "report", label: "Report", icon: FileText },
  { id: "profile", label: "Profile", icon: User }
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={`h-16 flex-col gap-1 rounded-none ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-xs ${isActive ? 'font-medium text-primary' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};