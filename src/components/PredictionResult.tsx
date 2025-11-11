import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Sprout, TrendingUp, Database, Gauge } from "lucide-react";

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

interface PredictionResultProps {
  data: PredictionData;
}

export const PredictionResult = ({ data }: PredictionResultProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-primary";
    if (confidence >= 75) return "text-accent";
    return "text-muted-foreground";
  };

  const getConfidenceInterpretation = (confidence: number) => {
    if (confidence >= 90) return "High reliability - Excellent data quality from all sources";
    if (confidence >= 75) return "Good reliability - Sufficient data coverage";
    return "Moderate reliability - Limited data availability";
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Main Prediction Card */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              Prediction Results
            </CardTitle>
            <Badge variant="outline" className="text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              ML-Powered
            </Badge>
          </div>
          <CardDescription>
            {data.location} • XGBoost Model • Multi-Source Data Fusion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Yield Prediction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Predicted Yield</p>
              <p className="text-4xl font-bold text-primary">
                {data.predictedYield.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">tonnes/hectare</p>
              <p className="text-sm text-foreground mt-2">
                Total estimated yield: <span className="font-semibold">{(data.predictedYield * data.area).toFixed(2)} tonnes</span>
              </p>
            </div>

            {/* Confidence Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Confidence Score
                </p>
                <p className={`text-2xl font-bold ${getConfidenceColor(data.confidence)}`}>
                  {data.confidence.toFixed(1)}%
                </p>
              </div>
              <Progress value={data.confidence} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {getConfidenceInterpretation(data.confidence)}
              </p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-3">
            <p className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Sources Integrated
            </p>
            <div className="flex flex-wrap gap-2">
              {data.dataSourcesUsed.map((source) => (
                <Badge key={source} variant="secondary" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Contributions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feature Contributions</CardTitle>
          <CardDescription>
            Impact of different factors on yield prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.featureContributions}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Historical Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historical Yield Trend</CardTitle>
          <CardDescription>
            Comparison with historical data for {data.cropType}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.historicalComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="yield" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--accent))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
