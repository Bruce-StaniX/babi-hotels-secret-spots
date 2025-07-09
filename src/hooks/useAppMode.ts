
import { useState, useEffect } from 'react';

type AppMode = 'normal' | 'couple' | 'private';
type Language = 'fr' | 'en';

interface AppState {
  mode: AppMode;
  language: Language;
  isOnboardingComplete: boolean;
  isPrivacyModeActive: boolean;
}

export const useAppMode = () => {
  const [state, setState] = useState<AppState>({
    mode: 'normal',
    language: 'fr',
    isOnboardingComplete: false,
    isPrivacyModeActive: false
  });

  useEffect(() => {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('hotro-app-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setState(prev => ({ ...prev, ...parsedState }));
      } catch (error) {
        console.log('Error loading app state:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('hotro-app-state', JSON.stringify(state));
    
    // Handle private mode effects
    if (state.mode === 'private') {
      setState(prev => ({ ...prev, isPrivacyModeActive: true }));
      
      // Block screenshots (limited browser support)
      document.addEventListener('keyup', preventScreenshots);
      document.addEventListener('keydown', preventScreenshots);
      
      // Clear history on mode activation
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.href);
      }
    } else {
      setState(prev => ({ ...prev, isPrivacyModeActive: false }));
      document.removeEventListener('keyup', preventScreenshots);
      document.removeEventListener('keydown', preventScreenshots);
    }

    return () => {
      document.removeEventListener('keyup', preventScreenshots);
      document.removeEventListener('keydown', preventScreenshots);
    };
  }, [state.mode]);

  const preventScreenshots = (e: KeyboardEvent) => {
    // Prevent common screenshot shortcuts
    if (
      (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's')) ||
      (e.key === 'PrintScreen') ||
      (e.altKey && e.key === 'PrintScreen')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const setMode = (mode: AppMode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const setLanguage = (language: Language) => {
    setState(prev => ({ ...prev, language }));
  };

  const completeOnboarding = () => {
    setState(prev => ({ ...prev, isOnboardingComplete: true }));
  };

  const clearPrivateData = () => {
    if (state.mode === 'private') {
      // Clear localStorage except for essential app state
      const essentialKeys = ['hotro-app-state'];
      const keysToRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !essentialKeys.includes(key)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear session storage
      sessionStorage.clear();
    }
  };

  return {
    ...state,
    setMode,
    setLanguage,
    completeOnboarding,
    clearPrivateData
  };
};
