import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserCog, X, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

export interface PersonaProfile {
  id: string;
  ageGroups: string[];
  genders: string[];
  geographies: string[];
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
      ageGroups: [],
      genders: [],
      geographies: [],
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
    if (!persona.interests.length || !persona.ageGroups.length || !persona.genders.length || !persona.geographies.length) return;
    
    const names = ["Alex", "Sarah", "Michael", "Emma", "David", "Lisa", "James", "Anna", "Robert", "Maria"];
    const suggestions: SuggestedPersona[] = [];
    
    for (let i = 0; i < 5; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const ageGroup = persona.ageGroups[Math.floor(Math.random() * persona.ageGroups.length)];
      const age = getRandomAge(ageGroup);
      const gender = persona.genders[Math.floor(Math.random() * persona.genders.length)];
      const geography = persona.geographies[Math.floor(Math.random() * persona.geographies.length)];
      const interests = persona.interests.slice(0, 2).join(", ");
      
      suggestions.push({
        id: `suggestion-${i}`,
        name,
        description: `${age} y/o ${gender.toLowerCase()} from ${geography}`,
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
    if (!persona.ageGroups.length || !persona.genders.length) return "New Persona";
    const ageRange = persona.ageGroups.length === 1 ? persona.ageGroups[0] : `${persona.ageGroups.length} age groups`;
    const genderText = persona.genders.length === 1 ? persona.genders[0] : `${persona.genders.length} genders`;
    const geoText = persona.geographies.length ? ` (${persona.geographies.length} locations)` : '';
    return `${ageRange} ${genderText}${geoText}`;
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
                <label className="text-xs font-medium text-muted-foreground">Age Groups</label>
                <Select onValueChange={(value) => {
                  const currentAges = persona.ageGroups;
                  if (!currentAges.includes(value)) {
                    updatePersona(persona.id, 'ageGroups', [...currentAges, value]);
                  }
                }}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Add age groups" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_GROUPS.filter(age => !persona.ageGroups.includes(age)).map(age => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {persona.ageGroups.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {persona.ageGroups.map(age => (
                      <Badge 
                        key={age} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => updatePersona(persona.id, 'ageGroups', persona.ageGroups.filter(a => a !== age))}
                      >
                        {age} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Genders</label>
                <Select onValueChange={(value) => {
                  const currentGenders = persona.genders;
                  if (!currentGenders.includes(value)) {
                    updatePersona(persona.id, 'genders', [...currentGenders, value]);
                  }
                }}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Add genders" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDERS.filter(gender => !persona.genders.includes(gender)).map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {persona.genders.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {persona.genders.map(gender => (
                      <Badge 
                        key={gender} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => updatePersona(persona.id, 'genders', persona.genders.filter(g => g !== gender))}
                      >
                        {gender} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Geographies</label>
                <Select onValueChange={(value) => {
                  const currentGeos = persona.geographies;
                  if (!currentGeos.includes(value)) {
                    updatePersona(persona.id, 'geographies', [...currentGeos, value]);
                  }
                }}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Add countries" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.filter(country => !persona.geographies.includes(country)).map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {persona.geographies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {persona.geographies.map(geography => (
                      <Badge 
                        key={geography} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => updatePersona(persona.id, 'geographies', persona.geographies.filter(g => g !== geography))}
                      >
                        {geography} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Interests</label>
              <Select onValueChange={(value) => {
                addInterest(persona.id, value);
                // Generate suggestions after interests are added
                const updatedPersona = { ...persona, interests: [...persona.interests, value] };
                if (updatedPersona.ageGroups.length && updatedPersona.genders.length && updatedPersona.geographies.length && updatedPersona.interests.length) {
                  generateSuggestions(updatedPersona);
                }
              }}>
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