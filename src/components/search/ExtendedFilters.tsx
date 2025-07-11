import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExtendedFiltersProps {
  showFilters: boolean;
  priceRange: string;
  rating: string;
  onPriceRangeChange: (value: string) => void;
  onRatingChange: (value: string) => void;
}

export const ExtendedFilters = ({ 
  showFilters, 
  priceRange, 
  rating, 
  onPriceRangeChange, 
  onRatingChange 
}: ExtendedFiltersProps) => {
  if (!showFilters) return null;

  return (
    <div className="mb-6 p-4 border rounded-lg bg-card">
      <h3 className="font-medium mb-3">Filtres avancés</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Gamme de prix</label>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une gamme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les prix</SelectItem>
              <SelectItem value="budget">Budget (&lt; 25,000 FCFA)</SelectItem>
              <SelectItem value="mid">Moyen (25,000 - 50,000 FCFA)</SelectItem>
              <SelectItem value="luxury">Luxe (&gt; 50,000 FCFA)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Note minimum</label>
          <Select value={rating} onValueChange={onRatingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Note minimum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les notes</SelectItem>
              <SelectItem value="4">4+ étoiles</SelectItem>
              <SelectItem value="3">3+ étoiles</SelectItem>
              <SelectItem value="2">2+ étoiles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};