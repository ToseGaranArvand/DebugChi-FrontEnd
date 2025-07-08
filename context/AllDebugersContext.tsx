"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Main, Expertise, UserLanguage } from '@/components/types/all-debugers';

// Define the type for our filter state
type SortOption = 'score_high' | 'score_low' | 'name_asc' | 'name_desc';

interface FilterContextType {
  // State
  searchTerm: string;
  selectedExpertise: string[];
  selectedLanguages: string[];
  sortOption: SortOption;
  
  // Filtered data
  filteredUsers: Main[];
  
  // Actions
  setSearchTerm: (term: string) => void;
  toggleExpertise: (expertise: string) => void;
  toggleLanguage: (language: string) => void;
  setSortOption: (option: SortOption) => void;
  resetFilters: () => void;
  
  // Metadata
  availableExpertise: string[];
  availableLanguages: string[];
}

// Create the context with a default value
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Props for our provider
interface FilterProviderProps {
  children: ReactNode;
  users: Main[];
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children, users }) => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('score_high');
  
  // Extract all available expertise and languages from users
  const [availableExpertise, setAvailableExpertise] = useState<string[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  
  // Compute available filter options when users change
  useEffect(() => {
    const expertiseSet = new Set<string>();
    const languageSet = new Set<string>();
    
    users.forEach(user => {
      // Add expertise
      user.user_expertise.forEach(exp => {
        if (exp.title) expertiseSet.add(exp.title);
      });
      
      // Add languages
      user.user_language.forEach(lang => {
        languageSet.add(lang.language_name.name);
      });
    });
    
    setAvailableExpertise(Array.from(expertiseSet).sort());
    setAvailableLanguages(Array.from(languageSet).sort());
  }, [users]);
  
  // Toggle expertise filter
  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise(prev => 
      prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise.toLowerCase()]
    );
  };
  
  // Toggle language filter
  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language.toLowerCase()]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedExpertise([]);
    setSelectedLanguages([]);
    setSortOption('score_high');
  };
  
  // Apply filters to get filtered users
  const filteredUsers = users
    .filter(user => {
      // Apply search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        
        if (!fullName.includes(searchLower) && 
            !user.username.toLowerCase().includes(searchLower) && 
            !user.email.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      // Apply expertise filter
      if (selectedExpertise.length > 0) {
        const userExpertiseTitles = user.user_expertise
          .map(exp => exp.title?.toLowerCase())
          .filter(Boolean) as string[];
          
        if (!selectedExpertise.some(exp => userExpertiseTitles.includes(exp))) {
          return false;
        }
      }
      
      // Apply language filter
      if (selectedLanguages.length > 0) {
        const userLanguages = user.user_language.map(lang => lang.language_name.name.toLowerCase());
        
        if (!selectedLanguages.some(lang => userLanguages.includes(lang))) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case 'score_high':
          return b.user_score - a.user_score;
        case 'score_low':
          return a.user_score - b.user_score;
        case 'name_asc':
          return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        case 'name_desc':
          return `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`);
        default:
          return 0;
      }
    });
  
  // Create the context value
  const contextValue: FilterContextType = {
    searchTerm,
    selectedExpertise,
    selectedLanguages,
    sortOption,
    filteredUsers,
    setSearchTerm,
    toggleExpertise,
    toggleLanguage,
    setSortOption,
    resetFilters,
    availableExpertise,
    availableLanguages
  };
  
  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  
  return context;
};