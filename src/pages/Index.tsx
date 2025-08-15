import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdPreview } from "@/components/AdPreview";
import { AdInputForm } from "@/components/AdInputForm";
import { PersonaBuilder, PersonaProfile } from "@/components/PersonaBuilder";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Zap } from "lucide-react";

// Mock data for demonstration
const generateMockResults = (personas: PersonaProfile[], adCopy: string) => {
  const personaFeedback = personas.map((persona, index) => ({
    personaId: persona.id,
    personaName: `${persona.ageGroup} ${persona.gender}`,
    archetype: `${persona.ageGroup} ${persona.gender} from ${persona.geography}`,
    resonanceScore: Math.floor(Math.random() * 4) + 6, // 6-10 range
    keyQuote: `This ad ${Math.random() > 0.5 ? 'really speaks to' : 'somewhat resonates with'} my interests in ${persona.interests.slice(0, 2).join(' and ')}.`,
    strengths: [
      "Clear messaging",
      "Authentic tone", 
      "Relevant content",
      "Appeals to my demographic"
    ].slice(0, Math.floor(Math.random() * 2) + 2),
    weaknesses: [
      "CTA could be stronger",
      "Visual appeal needs work",
      "Missing emotional hook",
      "Doesn't match my interests"
    ].slice(0, Math.floor(Math.random() * 2) + 1),
    confusingPoints: [
      "Unclear value proposition",
      "Too many competing elements",
      "Cultural mismatch"
    ].slice(0, Math.floor(Math.random() * 2) + 1),
    tags: [
      "Clear Messaging",
      "Strong Visuals", 
      "Effective CTA",
      "Good Emotional Hook",
      "Confusing Layout",
      "Demographic Match"
    ].slice(0, Math.floor(Math.random() * 3) + 2)
  }));

  const avgScore = personaFeedback.reduce((sum, p) => sum + p.resonanceScore, 0) / personaFeedback.length;
  const overallScore = Math.floor(avgScore * 10);
  
  return {
    overallScore,
    estimatedCost: Math.floor(Math.random() * 50) + 25,
    recommendations: [
      "Strengthen the call-to-action with more action-oriented language",
      "Add social proof elements to build trust",
      "Consider A/B testing different visual layouts",
      "Optimize copy for better emotional resonance",
      "Better target specific demographics and interests"
    ].slice(0, Math.floor(Math.random() * 2) + 2),
    personaFeedback
  };
};

const Index = () => {
  const { toast } = useToast();
  
  // Form state
  const [adCopy, setAdCopy] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [cta, setCta] = useState("");
  const [personas, setPersonas] = useState<PersonaProfile[]>([]);
  
  // Results state
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyzeAd = async () => {
    // Validation
    if (!adCopy.trim()) {
      toast({
        title: "Missing Ad Copy",
        description: "Please enter your ad copy before analyzing.",
        variant: "destructive"
      });
      return;
    }

    if (personas.length === 0) {
      toast({
        title: "No Personas Created",
        description: "Please create at least one persona for analysis.",
        variant: "destructive"
      });
      return;
    }

    const hasIncompletePersona = personas.some(p => !p.ageGroup || !p.gender || !p.geography || p.interests.length === 0);
    if (hasIncompletePersona) {
      toast({
        title: "Incomplete Personas", 
        description: "Please complete all persona details before analyzing.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = generateMockResults(personas, adCopy);
      setResults(mockResults);
      
      toast({
        title: "Analysis Complete!",
        description: `Your ad has been analyzed by ${personas.length} personas.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your ad. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                AdVibe Analytics
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              AI-Powered Ad Feedback
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Section 1: Ad Content Input */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-center gradient-hero bg-clip-text text-transparent">
              Create Your Ad Content
            </h2>
            <div className="max-w-2xl mx-auto">
              <AdInputForm
                adCopy={adCopy}
                setAdCopy={setAdCopy}
                imageFile={imageFile}
                setImageFile={setImageFile}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                cta={cta}
                setCta={setCta}
              />
            </div>
          </section>

          {/* Section 2: Persona Builder */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-center gradient-hero bg-clip-text text-transparent">
              Build Your Target Personas
            </h2>
            <div className="max-w-4xl mx-auto">
              <PersonaBuilder
                personas={personas}
                setPersonas={setPersonas}
              />
            </div>
          </section>

          {/* Section 3: Ad Preview */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-center gradient-hero bg-clip-text text-transparent">
              Ad Preview
            </h2>
            <div className="max-w-md mx-auto">
              <AdPreview
                adCopy={adCopy}
                imageUrl={imageUrl}
                videoUrl={videoUrl}
                cta={cta}
              />
            </div>
          </section>

          {/* Section 4: Analyze Button & Results */}
          <section>
            <div className="text-center mb-8">
              <Button
                onClick={handleAnalyzeAd}
                className="gradient-primary text-primary-foreground hover:shadow-glow transition-slow font-semibold px-12"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Ad
                  </>
                )}
              </Button>
            </div>

            {showResults ? (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-6 text-center gradient-hero bg-clip-text text-transparent">
                  Analysis Results
                </h2>
                <ResultsDisplay
                  overallScore={results?.overallScore || 0}
                  estimatedCost={results?.estimatedCost || 0}
                  recommendations={results?.recommendations || []}
                  personaFeedback={results?.personaFeedback || []}
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground max-w-md mx-auto">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analysis results will appear here after you create personas and analyze your ad</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;