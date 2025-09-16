import { useState } from "react";
import { MapPin, TrendingUp, Users, CheckCircle, Camera, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuickReportButton } from "./QuickReportButton";
import { ReportCard, IssueReport } from "./ReportCard";

// Mock data for demonstration
const mockReports: IssueReport[] = [
  {
    id: "1",
    title: "Large pothole on MG Road",
    description: "Dangerous pothole causing traffic issues and potential vehicle damage near City Center Mall.",
    category: "Pothole",
    location: "MG Road, Ranchi",
    status: "progress",
    upvotes: 24,
    reportedAt: "2024-01-15T10:30:00Z",
    imageUrl: "/api/placeholder/200/150",
    isUpvoted: false
  },
  {
    id: "2", 
    title: "Broken streetlight creating safety hazard",
    description: "Multiple streetlights not working on residential street, making it dangerous for pedestrians at night.",
    category: "Streetlight",
    location: "Circular Road, Dhanbad",
    status: "pending",
    upvotes: 18,
    reportedAt: "2024-01-14T18:45:00Z",
    isUpvoted: true
  },
  {
    id: "3",
    title: "Garbage disposal issue",
    description: "Overflowing garbage bins and scattered waste affecting the cleanliness of the area.",
    category: "Garbage",
    location: "Market Area, Jamshedpur",
    status: "resolved",
    upvotes: 12,
    reportedAt: "2024-01-13T14:20:00Z",
    imageUrl: "/api/placeholder/200/150"
  }
];

const statsData = [
  { icon: FileText, label: "Total Reports", value: "2,847", color: "text-primary" },
  { icon: TrendingUp, label: "Resolved This Month", value: "156", color: "text-civic-green" },
  { icon: Users, label: "Active Citizens", value: "1,234", color: "text-action" },
  { icon: CheckCircle, label: "Success Rate", value: "87%", color: "text-status-resolved" }
];

interface HomePageProps {
  onReportClick?: () => void;
  onViewAllIssues?: () => void;
}

export const HomePage = ({ onReportClick, onViewAllIssues }: HomePageProps) => {
  const [nearbyReports] = useState(mockReports.slice(0, 3));

  const handleUpvote = (reportId: string) => {
    console.log("Upvoted report:", reportId);
    // This would connect to backend when Supabase is integrated
  };

  const handleViewDetails = (reportId: string) => {
    console.log("View details for report:", reportId);
    // Navigate to detailed view
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Empowering Citizens,
            <br />
            <span className="text-primary-glow">Building Better Communities</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Report civic issues, track their progress, and work together to improve our neighborhoods across Jharkhand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={onReportClick}>
              <Camera className="h-5 w-5" />
              Report an Issue
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
              onClick={onViewAllIssues}
            >
              <MapPin className="h-5 w-5" />
              View All Issues
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <Card key={index} className="shadow-card text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-card-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Issues Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Recent Reports Near You
              </h2>
              <p className="text-muted-foreground">
                Issues reported by citizens in your area
              </p>
            </div>
            <Button variant="outline" onClick={onViewAllIssues}>
              View All
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nearbyReports.map((report, index) => (
              <div key={report.id} style={{ animationDelay: `${index * 0.15}s` }}>
                <ReportCard
                  report={report}
                  onUpvote={handleUpvote}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-action animate-pulse-glow" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            See Something? Report Something!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your voice matters. Every report helps build a better, safer, and cleaner community for everyone in Jharkhand.
          </p>
          <QuickReportButton 
            variant="inline" 
            size="lg"
            onClick={onReportClick}
          />
        </div>
      </section>

      {/* Floating Action Button */}
      <QuickReportButton onClick={onReportClick} />
    </div>
  );
};