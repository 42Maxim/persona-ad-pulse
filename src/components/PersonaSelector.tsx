import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Users } from "lucide-react";

export interface Persona {
  id: string;
  name: string;
  archetype: string;
  age: number;
  description: string;
  values: string[];
  concerns: string[];
}

const PERSONAS: Persona[] = [
  {
    id: "gen-z-creative",
    name: "Alex",
    archetype: "Gen Z Creative",
    age: 22,
    description: "Urban freelancer who values innovation and authenticity",
    values: ["Innovation", "Authenticity", "Tech-savvy", "Social impact"],
    concerns: ["Corporate manipulation", "Privacy", "Environmental impact"]
  },
  {
    id: "urban-parent",
    name: "Sarah",
    archetype: "Urban Parent",
    age: 35,
    description: "Working mom focused on family and practical solutions",
    values: ["Family first", "Practicality", "Time efficiency", "Value for money"],
    concerns: ["Child safety", "Budget constraints", "Time limitations"]
  },
  {
    id: "rural-retiree",
    name: "Robert",
    archetype: "Rural Retiree", 
    age: 65,
    description: "Retired farmer who values tradition and clear communication",
    values: ["Tradition", "Clarity", "Trustworthiness", "Community"],
    concerns: ["Complex technology", "Hidden costs", "Poor customer service"]
  }
];

interface PersonaSelectorProps {
  selectedPersonas: string[];
  setSelectedPersonas: (personas: string[]) => void;
}

export const PersonaSelector = ({ selectedPersonas, setSelectedPersonas }: PersonaSelectorProps) => {
  const handlePersonaChange = (personaId: string, checked: boolean) => {
    if (checked) {
      setSelectedPersonas([...selectedPersonas, personaId]);
    } else {
      setSelectedPersonas(selectedPersonas.filter(id => id !== personaId));
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Select Personas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {PERSONAS.map((persona) => (
          <div key={persona.id} className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id={persona.id}
                checked={selectedPersonas.includes(persona.id)}
                onCheckedChange={(checked) => 
                  handlePersonaChange(persona.id, checked as boolean)
                }
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={persona.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {persona.name} ({persona.archetype})
                </label>
                <p className="text-xs text-muted-foreground">
                  Age {persona.age} • {persona.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {persona.values.slice(0, 3).map((value) => (
                    <span
                      key={value}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {selectedPersonas.includes(persona.id) && (
              <div className="ml-6 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Concerns:</p>
                <div className="flex flex-wrap gap-1">
                  {persona.concerns.map((concern) => (
                    <span
                      key={concern}
                      className="inline-flex items-center rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-warning"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { PERSONAS };