import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const predictionSchema = z.object({
  cropType: z.string().min(1, "Please select a crop type"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  area: z.number().positive("Area must be positive"),
  season: z.string().min(1, "Please select a season"),
});

type PredictionFormData = z.infer<typeof predictionSchema>;

interface PredictionFormProps {
  onPredict: (data: PredictionFormData) => void;
  loading: boolean;
}

export const PredictionForm = ({ onPredict, loading }: PredictionFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cropType: "",
    latitude: "",
    longitude: "",
    area: "",
    season: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = predictionSchema.parse({
        cropType: formData.cropType,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        area: parseFloat(formData.area),
        season: formData.season,
      });

      onPredict(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle>Crop & Location Details</CardTitle>
        <CardDescription>
          Enter crop information and location coordinates for yield prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select
                value={formData.cropType}
                onValueChange={(value) => setFormData({ ...formData, cropType: value })}
              >
                <SelectTrigger id="cropType">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="soybean">Soybean</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select
                value={formData.season}
                onValueChange={(value) => setFormData({ ...formData, season: value })}
              >
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                placeholder="e.g., 28.6139"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                placeholder="e.g., 77.2090"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="area">Area (Hectares)</Label>
              <Input
                id="area"
                type="number"
                step="0.01"
                placeholder="e.g., 10.5"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Data...
              </>
            ) : (
              "Predict Yield"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
