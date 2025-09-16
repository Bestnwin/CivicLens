import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CivicHeaderProps {
  onMenuClick?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
}

export const CivicHeader = ({ 
  onMenuClick, 
  onProfileClick, 
  onNotificationsClick,
  notificationCount = 0 
}: CivicHeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu and Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-civic rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CL</span>
            </div>
            <h1 className="font-bold text-lg text-foreground">CivicLens</h1>
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationsClick}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-action text-action-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="p-1"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
};