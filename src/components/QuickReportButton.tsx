import { Plus, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickReportButtonProps {
  onClick?: () => void;
  variant?: "floating" | "inline";
  size?: "default" | "lg";
}

export const QuickReportButton = ({ 
  onClick, 
  variant = "floating",
  size = "default" 
}: QuickReportButtonProps) => {
  const baseClasses = "gradient-action shadow-action hover:shadow-xl transition-all duration-300 animate-pulse-glow";
  
  if (variant === "floating") {
    return (
      <Button
        onClick={onClick}
        className={`${baseClasses} fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-2xl`}
        size="lg"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Report Issue</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      className={`${baseClasses} ${size === "lg" ? "h-12 text-base" : ""}`}
      size={size}
    >
      <Camera className="h-5 w-5 mr-2" />
      Report Issue
    </Button>
  );
};