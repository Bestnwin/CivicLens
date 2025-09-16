import { useState } from "react";
import { CivicHeader } from "@/components/CivicHeader";
import { HomePage } from "@/components/HomePage";
import { ReportForm } from "@/components/ReportForm";
import { IssuesDashboard } from "@/components/IssuesDashboard";
import { UserProfile } from "@/components/UserProfile";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isReporting, setIsReporting] = useState(false);
  const { toast } = useToast();

  const handleReportClick = () => {
    setIsReporting(true);
  };

  const handleReportSubmit = (report: any) => {
    console.log("Report submitted:", report);
    setIsReporting(false);
    setActiveTab("issues");
  };

  const handleReportCancel = () => {
    setIsReporting(false);
  };

  const handleProfileAction = (action: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} functionality will be available after Supabase integration.`,
    });
  };

  const renderContent = () => {
    if (isReporting) {
      return (
        <ReportForm
          onSubmit={handleReportSubmit}
          onCancel={handleReportCancel}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <HomePage
            onReportClick={handleReportClick}
            onViewAllIssues={() => setActiveTab("issues")}
          />
        );
      case "issues":
        return <IssuesDashboard onReportClick={handleReportClick} />;
      case "report":
        return (
          <ReportForm
            onSubmit={handleReportSubmit}
            onCancel={() => setActiveTab("home")}
          />
        );
      case "profile":
        return (
          <UserProfile
            onEditProfile={() => handleProfileAction("Edit Profile")}
            onSettings={() => handleProfileAction("Settings")}
            onLogout={() => handleProfileAction("Logout")}
          />
        );
      default:
        return <HomePage onReportClick={handleReportClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {!isReporting && (
        <CivicHeader
          onMenuClick={() => console.log("Menu clicked")}
          onProfileClick={() => setActiveTab("profile")}
          onNotificationsClick={() => handleProfileAction("Notifications")}
          notificationCount={3}
        />
      )}

      {/* Main Content */}
      <main className={!isReporting ? "pb-16" : ""}>
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {!isReporting && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
    </div>
  );
};

export default Index;
