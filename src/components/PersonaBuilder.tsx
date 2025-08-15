import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserCog, X, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

export interface PersonaProfile {
  id: string;
  ageGroup: string;
  gender: string;
  geography: string;
  interests: string[];
  character?: string;
}

export interface SuggestedPersona {
  id: string;
  name: string;
  description: string;
  details: string;
}

const AGE_GROUPS = [
  "18–24",
  "25–34", 
  "35–44",
  "45–54",
  "55–64",
  "65+"
];

const GENDERS = [
  "Male",
  "Female", 
  "Other"
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Switzerland",
  "Austria",
  "Belgium",
  "Ireland",
  "New Zealand"
];

const INTERESTS = [
  "Fashion & Beauty",
  "Health & Fitness",
  "Sports & Recreation", 
  "Travel & Leisure",
  "Food & Drink",
  "Technology & Gadgets",
  "Business & Finance",
  "Arts, Entertainment & Culture"
];

interface PersonaBuilderProps {
  personas: PersonaProfile[];
  setPersonas: (personas: PersonaProfile[]) => void;
}

export const PersonaBuilder = ({ personas, setPersonas }: PersonaBuilderProps) => {
  const [suggestedPersonas, setSuggestedPersonas] = useState<SuggestedPersona[]>([]);
  const [showingSuggestions, setShowingSuggestions] = useState<string | null>(null);

  const addNewPersona = () => {
    const newPersona: PersonaProfile = {
      id: `persona-${Date.now()}`,
      ageGroup: "",
      gender: "",
      geography: "",
      interests: [],
      character: ""
    };
    setPersonas([...personas, newPersona]);
  };

  const removePersona = (id: string) => {
    setPersonas(personas.filter(p => p.id !== id));
  };

  const updatePersona = (id: string, field: keyof PersonaProfile, value: any) => {
    setPersonas(personas.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const addInterest = (personaId: string, interest: string) => {
    const persona = personas.find(p => p.id === personaId);
    if (persona && !persona.interests.includes(interest)) {
      updatePersona(personaId, 'interests', [...persona.interests, interest]);
    }
  };

  const removeInterest = (personaId: string, interest: string) => {
    const persona = personas.find(p => p.id === personaId);
    if (persona) {
      updatePersona(personaId, 'interests', persona.interests.filter(i => i !== interest));
    }
  };

  const generateSuggestions = (persona: PersonaProfile) => {
    if (!persona.ageGroup || !persona.gender || !persona.geography) return;
    
    const names = ["Alex", "Sarah", "Michael", "Emma", "David", "Lisa", "James", "Anna", "Robert", "Maria"];
    const suggestions: SuggestedPersona[] = [];
    
    for (let i = 0; i < 5; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const age = getRandomAge(persona.ageGroup);
      const interests = persona.interests.slice(0, 2).join(", ");
      
      suggestions.push({
        id: `suggestion-${i}`,
        name,
        description: `${age} y/o ${persona.gender.toLowerCase()} from ${persona.geography}`,
        details: interests ? `Interested in ${interests}` : "Various interests"
      });
    }
    
    setSuggestedPersonas(suggestions);
    setShowingSuggestions(persona.id);
  };

  const getRandomAge = (ageGroup: string) => {
    const ranges: { [key: string]: [number, number] } = {
      "18–24": [18, 24],
      "25–34": [25, 34],
      "35–44": [35, 44],
      "45–54": [45, 54],
      "55–64": [55, 64],
      "65+": [65, 75]
    };
    const [min, max] = ranges[ageGroup] || [25, 35];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const selectSuggestedPersona = (suggestion: SuggestedPersona, personaId: string) => {
    updatePersona(personaId, 'character', `${suggestion.name} - ${suggestion.description}. ${suggestion.details}`);
    setShowingSuggestions(null);
  };

  const getPersonaName = (persona: PersonaProfile) => {
    if (persona.character) {
      const name = persona.character.split(' - ')[0];
      return name || "Custom Persona";
    }
    if (!persona.ageGroup || !persona.gender) return "New Persona";
    return `${persona.ageGroup} ${persona.gender}${persona.geography ? ` from ${persona.geography}` : ''}`;
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          Build Custom Personas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {personas.map((persona, index) => (
          <div key={persona.id} className="border rounded-lg p-4 space-y-4 bg-gradient-to-r from-secondary/20 to-accent/10">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">
                Persona {index + 1}: {getPersonaName(persona)}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePersona(persona.id)}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Age Group</label>
                <Select 
                  value={persona.ageGroup} 
                  onValueChange={(value) => updatePersona(persona.id, 'ageGroup', value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_GROUPS.map(age => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Gender</label>
                <Select 
                  value={persona.gender} 
                  onValueChange={(value) => updatePersona(persona.id, 'gender', value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDERS.map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Geography</label>
                <Select 
                  value={persona.geography} 
                  onValueChange={(value) => {
                    updatePersona(persona.id, 'geography', value);
                    // Generate suggestions when all required fields are filled
                    const updatedPersona = { ...persona, geography: value };
                    if (updatedPersona.ageGroup && updatedPersona.gender && value) {
                      generateSuggestions(updatedPersona);
                    }
                  }}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Interests</label>
              <Select onValueChange={(value) => addInterest(persona.id, value)}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Add interests" />
                </SelectTrigger>
                <SelectContent>
                  {INTERESTS.filter(interest => !persona.interests.includes(interest)).map(interest => (
                    <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {persona.interests.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {persona.interests.map(interest => (
                    <Badge 
                      key={interest} 
                      variant="secondary" 
                      className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeInterest(persona.id, interest)}
                    >
                      {interest} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {showingSuggestions === persona.id && suggestedPersonas.length > 0 && (
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Suggested Personas
                </label>
                <div className="grid gap-2 mt-2">
                  {suggestedPersonas.map(suggestion => (
                    <div 
                      key={suggestion.id}
                      className="p-2 border rounded cursor-pointer hover:bg-accent/20 transition-colors"
                      onClick={() => selectSuggestedPersona(suggestion, persona.id)}
                    >
                      <div className="font-medium text-sm">{suggestion.name}</div>
                      <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                      <div className="text-xs text-muted-foreground">{suggestion.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-muted-foreground">Character Details</label>
              <Textarea 
                placeholder="Describe this persona's character, personality, and background..."
                value={persona.character || ""}
                onChange={(e) => updatePersona(persona.id, 'character', e.target.value)}
                className="min-h-[80px] text-sm"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addNewPersona}
          variant="outline"
          className="w-full border-dashed border-2 text-muted-foreground hover:text-foreground hover:border-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Persona
        </Button>
      </CardContent>
    </Card>
  );
};