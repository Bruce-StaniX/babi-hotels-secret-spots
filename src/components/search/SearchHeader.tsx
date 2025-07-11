import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SearchHeaderProps {
  onGoBack: () => void;
}

export const SearchHeader = ({ onGoBack }: SearchHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onGoBack}
          className="mr-3"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Recherche</h1>
          <p className="text-muted-foreground">Trouvez l'hébergement parfait</p>
        </div>
      </div>
    </div>
  );
};