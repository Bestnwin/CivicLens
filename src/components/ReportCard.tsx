import { MapPin, ThumbsUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface IssueReport {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pending' | 'progress' | 'resolved';
  upvotes: number;
  reportedAt: string;
  imageUrl?: string;
  isUpvoted?: boolean;
}

interface ReportCardProps {
  report: IssueReport;
  onUpvote?: (reportId: string) => void;
  onViewDetails?: (reportId: string) => void;
}

export const ReportCard = ({ report, onUpvote, onViewDetails }: ReportCardProps) => {
  const getStatusIcon = () => {
    switch (report.status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (report.status) {
      case 'pending':
        return 'bg-status-pending text-black';
      case 'progress':
        return 'bg-status-progress text-white';
      case 'resolved':
        return 'bg-status-resolved text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground line-clamp-2">
              {report.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {report.category}
              </Badge>
              <Badge className={`text-xs ${getStatusColor()}`}>
                <div className="flex items-center gap-1">
                  {getStatusIcon()}
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </div>
              </Badge>
            </div>
          </div>
          {report.imageUrl && (
            <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              <img 
                src={report.imageUrl} 
                alt="Issue" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {report.description}
        </p>
        
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-4">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{report.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(report.reportedAt)}
          </span>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpvote?.(report.id)}
              className={`flex items-center gap-1 ${
                report.isUpvoted 
                  ? 'text-action hover:text-action/80' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs">{report.upvotes}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(report.id)}
              className="text-xs"
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};