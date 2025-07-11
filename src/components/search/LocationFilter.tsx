import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { communes, getCommuneDisplayName } from '@/data/hotelsData';

interface LocationFilterProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export const LocationFilter = ({ location, onLocationChange }: LocationFilterProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
        <Select 
          value={location || "all"} 
          onValueChange={onLocationChange}
        >
          <SelectTrigger className="pl-10">
            <SelectValue placeholder="Filtrer par commune..." />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectItem value="all">Toutes les communes</SelectItem>
            {communes.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {getCommuneDisplayName(commune)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};