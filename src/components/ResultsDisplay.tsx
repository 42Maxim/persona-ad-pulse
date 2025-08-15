import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, DollarSign, Target, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface PersonaFeedback {
  personaId: string;
  personaName: string;
  archetype: string;
  resonanceScore: number;
  keyQuote: string;
  strengths: string[];
  weaknesses: string[];
  confusingPoints: string[];
  tags: string[];
}

interface ResultsDisplayProps {
  overallScore: number;
  estimatedCost: number;
  recommendations: string[];
  personaFeedback: PersonaFeedback[];
  isLoading: boolean;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
};

const getScoreGradient = (score: number) => {
  if (score >= 80) return "gradient-success";
  if (score >= 60) return "bg-warning";
  return "bg-destructive";
};

const getTagVariant = (tag: string) => {
  const positiveWords = ["Strong", "Effective", "Clear", "Appealing", "Good"];
  const negativeWords = ["Weak", "Confusing", "Poor", "Low", "Bad"];
  
  if (positiveWords.some(word => tag.includes(word))) return "success";
  if (negativeWords.some(word => tag.includes(word))) return "destructive";
  return "secondary";
};

export const ResultsDisplay = ({ 
  overallScore, 
  estimatedCost, 
  recommendations, 
  personaFeedback, 
  isLoading 
}: ResultsDisplayProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Analyzing your ad with AI personas...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}/100
                </p>
              </div>
              <TrendingUp className={`h-8 w-8 ${getScoreColor(overallScore)}`} />
            </div>
            <Progress value={overallScore} className="mt-4" />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Est. Cost/Conversion</p>
                <p className="text-3xl font-bold">${estimatedCost}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Personas Analyzed</p>
                <p className="text-3xl font-bold">{personaFeedback.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Improvement Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Persona Feedback Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Persona Feedback</h3>
        {personaFeedback.map((feedback) => (
          <Card key={feedback.personaId} className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {feedback.personaName} ({feedback.archetype})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Resonance:</span>
                  <span className={`text-lg font-bold ${getScoreColor(feedback.resonanceScore * 10)}`}>
                    {feedback.resonanceScore}/10
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Quote */}
              <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <p className="italic text-sm">"{feedback.keyQuote}"</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {feedback.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant={getTagVariant(tag) as any}
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Detailed Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-success mb-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-muted-foreground">• {strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-destructive mb-2 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-1">
                    {feedback.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-muted-foreground">• {weakness}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-warning mb-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Confusing Points
                  </h4>
                  <ul className="space-y-1">
                    {feedback.confusingPoints.map((point, index) => (
                      <li key={index} className="text-muted-foreground">• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};