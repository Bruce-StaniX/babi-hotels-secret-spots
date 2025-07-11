import { Button } from '@/components/ui/button';
import { Filter, MapPin, Star } from 'lucide-react';

interface FilterButtonsProps {
  showFilters: boolean;
  sortBy: 'default' | 'rating' | 'proximity';
  onToggleFilters: () => void;
  onSortByRating: () => void;
  onSortByProximity: () => void;
}

export const FilterButtons = ({ 
  showFilters, 
  sortBy, 
  onToggleFilters, 
  onSortByRating, 
  onSortByProximity 
}: FilterButtonsProps) => {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      <Button 
        variant={showFilters ? "default" : "outline"} 
        size="sm"
        onClick={onToggleFilters}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filtres
      </Button>
      <Button 
        variant={sortBy === 'proximity' ? "default" : "outline"} 
        size="sm"
        onClick={onSortByProximity}
      >
        <MapPin className="w-4 h-4 mr-2" />
        Près de moi
      </Button>
      <Button 
        variant={sortBy === 'rating' ? "default" : "outline"} 
        size="sm"
        onClick={onSortByRating}
      >
        <Star className="w-4 h-4 mr-2" />
        Mieux notés
      </Button>
    </div>
  );
};