import { useState } from "react";
import { User, Settings, Bell, FileText, TrendingUp, MapPin, Edit3, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock user data
const userData = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  phone: "+91 98765 43210",
  location: "Ranchi, Jharkhand",
  joinedDate: "January 2024",
  reportsSubmitted: 12,
  issuesResolved: 8,
  civicScore: 85,
  badges: [
    { name: "Active Reporter", color: "bg-civic-green", description: "Reported 10+ issues" },
    { name: "Community Helper", color: "bg-primary", description: "High engagement" },
    { name: "Verified Citizen", color: "bg-action", description: "Verified profile" }
  ]
};

interface UserProfileProps {
  onEditProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export const UserProfile = ({ onEditProfile, onSettings, onLogout }: UserProfileProps) => {
  const [activeSection, setActiveSection] = useState("overview");

  const profileSections = [
    { id: "overview", label: "Overview", icon: User },
    { id: "reports", label: "My Reports", icon: FileText },
    { id: "activity", label: "Activity", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="gradient-civic px-4 pt-8 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 shadow-card">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-white text-primary text-2xl font-bold">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">
            {userData.name}
          </h1>
          <p className="text-primary-foreground/80 mb-2">{userData.email}</p>
          
          <div className="flex items-center justify-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <MapPin className="h-4 w-4" />
            <span>{userData.location}</span>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm" onClick={onEditProfile}
              className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onClick={onSettings}
              className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="px-4 -mt-6 relative z-10 mb-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardContent className="p-2">
              <div className="flex overflow-x-auto gap-1">
                {profileSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 max-w-2xl mx-auto space-y-6">
        
        {/* Overview Section */}
        {activeSection === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-card text-center animate-fade-up">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {userData.reportsSubmitted}
                  </div>
                  <div className="text-sm text-muted-foreground">Reports Submitted</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card text-center animate-fade-up">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-civic-green mb-1">
                    {userData.issuesResolved}
                  </div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </CardContent>
              </Card>
            </div>

            {/* Civic Score */}
            <Card className="shadow-card animate-fade-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Civic Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-primary">{userData.civicScore}/100</span>
                  <Badge className="bg-civic-green text-white">Excellent</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div 
                    className="bg-civic-green h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${userData.civicScore}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your civic engagement score based on reports submitted, community interaction, and issue resolution.
                </p>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="shadow-card animate-fade-up">
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${badge.color}`} />
                      <div>
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* My Reports Section */}
        {activeSection === "reports" && (
          <Card className="shadow-card animate-fade-up">
            <CardHeader>
              <CardTitle>My Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Pothole on Main Street</div>
                      <div className="text-xs text-muted-foreground">Reported 2 days ago</div>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-red-600">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};