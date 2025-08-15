import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCog, X, Plus } from "lucide-react";

export interface PersonaProfile {
  id: string;
  ageGroup: string;
  gender: string;
  geography: string;
  interests: string[];
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
  const addNewPersona = () => {
    const newPersona: PersonaProfile = {
      id: `persona-${Date.now()}`,
      ageGroup: "",
      gender: "",
      geography: "",
      interests: []
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

  const getPersonaName = (persona: PersonaProfile) => {
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
                  onValueChange={(value) => updatePersona(persona.id, 'geography', value)}
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