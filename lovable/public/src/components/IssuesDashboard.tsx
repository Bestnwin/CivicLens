import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportCard, IssueReport } from "./ReportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Extended mock data for dashboard
const allReports: IssueReport[] = [
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
    title: "Garbage disposal issue in market area",
    description: "Overflowing garbage bins and scattered waste affecting the cleanliness of the area.",
    category: "Garbage",
    location: "Market Area, Jamshedpur",
    status: "resolved",
    upvotes: 12,
    reportedAt: "2024-01-13T14:20:00Z",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: "4",
    title: "Water logging during monsoon",
    description: "Severe water logging issue that affects traffic flow and pedestrian movement during rains.",
    category: "Water Logging",
    location: "Station Road, Bokaro",
    status: "pending",
    upvotes: 31,
    reportedAt: "2024-01-12T09:15:00Z",
    imageUrl: "/api/placeholder/200/150"
  },
  {
    id: "5",
    title: "Broken road surface needs repair",
    description: "Road surface has multiple cracks and potholes making it difficult for vehicles to pass safely.",
    category: "Broken Road",
    location: "NH-33, Hazaribagh",
    status: "progress",
    upvotes: 45,
    reportedAt: "2024-01-11T16:20:00Z"
  },
  {
    id: "6",
    title: "Malfunctioning traffic signal",
    description: "Traffic signal not working properly causing confusion and potential accidents at busy intersection.",
    category: "Traffic Signal",
    location: "Albert Ekka Chowk, Ranchi",
    status: "resolved",
    upvotes: 22,
    reportedAt: "2024-01-10T12:45:00Z",
    imageUrl: "/api/placeholder/200/150"
  }
];

const categories = ["All", "Pothole", "Streetlight", "Garbage", "Water Logging", "Broken Road", "Traffic Signal"];
const statusOptions = ["All", "pending", "progress", "resolved"];
const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "status", label: "By Status" }
];

interface IssuesDashboardProps {
  onReportClick?: () => void;
}

export const IssuesDashboard = ({ onReportClick }: IssuesDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [filteredReports, setFilteredReports] = useState(allReports);

  // Filter and sort logic
  useEffect(() => {
    let filtered = allReports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || report.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || report.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort the filtered results
    switch (sortBy) {
      case "popular":
        filtered = filtered.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "status":
        filtered = filtered.sort((a, b) => {
          const statusOrder = { pending: 0, progress: 1, resolved: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        break;
      default: // recent
        filtered = filtered.sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
    }

    setFilteredReports(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const handleUpvote = (reportId: string) => {
    console.log("Upvoted report:", reportId);
    // This would connect to backend when Supabase is integrated
  };

  const handleViewDetails = (reportId: string) => {
    console.log("View details for report:", reportId);
    // Navigate to detailed view
  };

  const getStatusCount = (status: string) => {
    return allReports.filter(report => report.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-civic py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            Issues Dashboard
          </h1>
          <p className="text-primary-foreground/90">
            Track and monitor civic issues across Jharkhand
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-6 relative z-10 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-status-pending" />
                  <div>
                    <div className="text-2xl font-bold">{getStatusCount("pending")}</div>
                    <div className="text-sm text-muted-foreground">Pending Issues</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-status-progress" />
                  <div>
                    <div className="text-2xl font-bold">{getStatusCount("progress")}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-status-resolved flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{getStatusCount("resolved")}</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues by title, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Status and Sort */}
                <div className="flex gap-2">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Issues Found</h3>
              <p className="text-muted-foreground mb-6">
                No civic issues match your current filters. Try adjusting your search criteria.
              </p>
              <Button variant="action" onClick={onReportClick}>
                Report New Issue
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report, index) => (
                <div key={report.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ReportCard
                    report={report}
                    onUpvote={handleUpvote}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};