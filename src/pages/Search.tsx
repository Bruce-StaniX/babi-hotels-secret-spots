import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Hotel } from '@/data/hotelsData';
import { ViewHotelDialog } from '@/components/ViewHotelDialog';
import AdBanner from '@/components/AdBanner';
import AdSidebar from '@/components/AdSidebar';
import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchBar } from '@/components/search/SearchBar';
import { LocationFilter } from '@/components/search/LocationFilter';
import { FilterButtons } from '@/components/search/FilterButtons';
import { ExtendedFilters } from '@/components/search/ExtendedFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearchFilters } from '@/hooks/useSearchFilters';

const Search = () => {
  const navigate = useNavigate();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const {
    searchQuery,
    filters,
    searchResults,
    sortBy,
    showFilters,
    handleSearchChange,
    handleLocationChange,
    handleSortByRating,
    handleSortByProximity,
    handleToggleFilters,
    handlePriceRangeChange,
    handleRatingChange
  } = useSearchFilters();

  const handleViewHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Top Banner Ad */}
      <div className="py-2 bg-background/50">
        <div className="container mx-auto px-4">
          <AdBanner type="banner" position="top" location={filters.location} dismissible={true} />
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
          <SearchHeader onGoBack={() => navigate('/')} />
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <LocationFilter location={filters.location} onLocationChange={handleLocationChange} />
          <FilterButtons 
            showFilters={showFilters}
            sortBy={sortBy}
            onToggleFilters={handleToggleFilters}
            onSortByRating={handleSortByRating}
            onSortByProximity={handleSortByProximity}
          />
          <ExtendedFilters 
            showFilters={showFilters}
            priceRange={filters.priceRange}
            rating={filters.rating}
            onPriceRangeChange={handlePriceRangeChange}
            onRatingChange={handleRatingChange}
          />
          <SearchResults 
            searchResults={searchResults}
            location={filters.location}
            onViewHotel={handleViewHotel}
          />
        </div>

        {/* Sidebar Ads */}
        <div className="hidden lg:block w-72 p-4">
          <div className="sticky top-20">
            <AdSidebar location={filters.location} />
          </div>
        </div>
      </div>

      <ViewHotelDialog 
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        hotel={selectedHotel}
      />
    </div>
  );
};

export default Search;