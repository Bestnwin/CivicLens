import { useState } from "react";
import { Camera, MapPin, FileText, Upload, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const issueCategories = [
  { id: "pothole", label: "Pothole", color: "bg-red-500" },
  { id: "streetlight", label: "Streetlight", color: "bg-yellow-500" },
  { id: "garbage", label: "Garbage", color: "bg-green-500" },
  { id: "water", label: "Water Logging", color: "bg-blue-500" },
  { id: "road", label: "Broken Road", color: "bg-orange-500" },
  { id: "traffic", label: "Traffic Signal", color: "bg-purple-500" },
  { id: "drainage", label: "Drainage", color: "bg-cyan-500" },
  { id: "other", label: "Other", color: "bg-gray-500" }
];

interface ReportFormProps {
  onSubmit?: (report: any) => void;
  onCancel?: () => void;
}

export const ReportForm = ({ onSubmit, onCancel }: ReportFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [location, setLocation] = useState("Detecting location...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Simulate location detection
  useState(() => {
    setTimeout(() => {
      setLocation("MG Road, Ranchi, Jharkhand");
    }, 2000);
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      toast({
        title: "Category Required",
        description: "Please select an issue category before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReport = {
        category: selectedCategory,
        description,
        location,
        image,
        timestamp: new Date().toISOString()
      };

      toast({
        title: "Report Submitted Successfully!",
        description: "Your civic issue has been reported. You'll receive updates on its progress.",
      });

      onSubmit?.(newReport);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again. Make sure you have internet connection.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-card">
          <CardContent className="pt-8 pb-8">
            <div className="gradient-civic w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Submitting Report...</h3>
            <p className="text-muted-foreground">
              Your civic issue is being processed and will be reviewed by local authorities.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-card animate-fade-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="gradient-civic w-8 h-8 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                Report Civic Issue
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Photo Evidence (Recommended)
                </Label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Take a photo of the issue to help authorities understand the problem better
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      <Camera className="h-4 w-4" />
                      Take Photo
                    </Label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Issue preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Category Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Issue Category *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {issueCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedCategory === category.id
                          ? 'border-primary bg-primary/10 shadow-civic'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-sm font-medium">{category.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium mb-3 block">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional details about the issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-20"
                />
              </div>

              {/* Location */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Location
                </Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{location}</span>
                  {location === "Detecting location..." && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="action"
                  className="flex-1"
                  disabled={!selectedCategory}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};