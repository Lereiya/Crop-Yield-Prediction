import { useState } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { DataSourceIndicator } from "@/components/DataSourceIndicator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sprout, Brain, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionData {
  predictedYield: number;
  confidence: number;
  cropType: string;
  area: number;
  location: string;
  dataSourcesUsed: string[];
  featureContributions: { name: string; value: number }[];
  historicalComparison: { month: string; yield: number }[];
}

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);

  const handlePredict = async (formData: any) => {
    setLoading(true);
    
    try {
      // Reverse geocode to get location name
      let locationName = "Unknown Location";
      try {
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${formData.latitude}&lon=${formData.longitude}`
        );
        const geoData = await geoResponse.json();
        locationName = geoData.display_name || `${formData.latitude}°N, ${formData.longitude}°E`;
      } catch (error) {
        console.error("Geocoding failed:", error);
        locationName = `${formData.latitude}°N, ${formData.longitude}°E`;
      }
      
      // TODO: Replace with actual API call to Python backend
      // Example: const response = await fetch('YOUR_BACKEND_URL/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction data (replace with actual backend response)
      const mockData: PredictionData = {
        predictedYield: 3.45 + Math.random() * 1.5,
        confidence: 85 + Math.random() * 12,
        cropType: formData.cropType,
        area: formData.area,
        location: locationName,
        dataSourcesUsed: [
          "NASA Earth Data (MODIS)",
          "OpenWeatherMap API",
          "FAO Soils Portal"
        ],
        featureContributions: [
          { name: "Rainfall", value: 0.28 },
          { name: "Temperature", value: 0.22 },
          { name: "NDVI", value: 0.18 },
          { name: "Soil pH", value: 0.15 },
          { name: "Soil Nitrogen", value: 0.17 }
        ],
        historicalComparison: [
          { month: "Jan", yield: 3.2 },
          { month: "Feb", yield: 3.4 },
          { month: "Mar", yield: 3.6 },
          { month: "Apr", yield: 3.8 },
          { month: "May", yield: 4.0 },
          { month: "Jun", yield: 3.9 }
        ]
      };
      
      setPredictionData(mockData);
      
      toast({
        title: "Prediction Complete",
        description: "Yield prediction generated successfully using XGBoost model",
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Unable to generate prediction. Please check your backend connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Crop Yield Prediction System</h1>
                <p className="text-sm text-muted-foreground">ML-Powered Multi-Source Data Fusion</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            XGBoost Machine Learning Model
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Precision Agriculture Through Data Science
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced crop yield prediction using multi-source data fusion from NASA Earth Data, 
            OpenWeatherMap, and FAO Soils Portal
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm">{'<'}10s Prediction Time</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm">XGBoost Algorithm</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
              <Sprout className="h-4 w-4 text-chart-4" />
              <span className="text-sm">Multi-Crop Support</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Data Sources */}
          <div className="lg:col-span-1">
            <DataSourceIndicator />
          </div>

          {/* Middle/Right Columns - Form and Results */}
          <div className="lg:col-span-2 space-y-6">
            <PredictionForm onPredict={handlePredict} loading={loading} />
            
            {predictionData && <PredictionResult data={predictionData} />}
          </div>
        </div>

        {/* Academic Disclaimer */}
        <footer className="mt-12 p-6 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Academic Project Disclaimer:</strong> This is a capstone project for educational purposes. 
            Predictions are generated using machine learning models trained on historical data and should not be 
            used as the sole basis for agricultural decisions. For production use, consult with agricultural experts 
            and conduct thorough field validation.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
