import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchHotels, Hotel } from '@/data/hotelsData';

interface Filters {
  location: string;
  priceRange: string;
  rating: string;
}

export const useSearchFilters = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    location: '',
    priceRange: 'all',
    rating: 'all'
  });
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'proximity'>('default');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
    const results = searchHotels(searchQuery, locationParam || filters.location);
    setSearchResults(results);
  }, [searchParams, searchQuery]);

  const handleLocationChange = (location: string) => {
    const actualLocation = location === "all" ? "" : location;
    setFilters(prev => ({ ...prev, location: actualLocation }));
    const results = searchHotels(searchQuery, actualLocation);
    setSearchResults(results);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const results = searchHotels(query, filters.location);
    setSearchResults(results);
  };

  const sortResults = (results: Hotel[], sortType: 'default' | 'rating' | 'proximity') => {
    const sorted = [...results];
    switch (sortType) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'proximity':
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  };

  const handleSortByRating = () => {
    const newSortBy = sortBy === 'rating' ? 'default' : 'rating';
    setSortBy(newSortBy);
    const sortedResults = sortResults(searchResults, newSortBy);
    setSearchResults(sortedResults);
  };

  const handleSortByProximity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const newSortBy = sortBy === 'proximity' ? 'default' : 'proximity';
          setSortBy(newSortBy);
          const sortedResults = sortResults(searchResults, newSortBy);
          setSearchResults(sortedResults);
        },
        () => {
          alert('Veuillez autoriser la géolocalisation pour trier par proximité');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
    }
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceRangeChange = (value: string) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleRatingChange = (value: string) => {
    setFilters(prev => ({ ...prev, rating: value }));
  };

  return {
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
  };
};