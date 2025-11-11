import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Cloud, Database as DatabaseIcon } from "lucide-react";

export const DataSourceIndicator = () => {
  const dataSources = [
    {
      name: "NASA Earth Data",
      icon: Satellite,
      description: "NDVI, EVI, and satellite imagery",
      status: "active",
      color: "text-primary"
    },
    {
      name: "OpenWeatherMap",
      icon: Cloud,
      description: "Temperature, rainfall, and humidity",
      status: "active",
      color: "text-accent"
    },
    {
      name: "FAO Soils Portal",
      icon: DatabaseIcon,
      description: "Soil pH, nitrogen, and nutrients",
      status: "active",
      color: "text-chart-4"
    }
  ];

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Multi-Source Data Fusion</CardTitle>
        <CardDescription>
          Real-time integration from multiple authoritative sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map((source) => {
            const Icon = source.icon;
            return (
              <div key={source.name} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <Icon className={`h-5 w-5 mt-0.5 ${source.color}`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{source.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {source.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{source.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
