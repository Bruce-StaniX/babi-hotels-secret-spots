import { useState, useEffect } from 'react';
import AdBanner from './AdBanner';

interface AdSidebarProps {
  location?: string;
  className?: string;
}

const AdSidebar = ({ location, className = '' }: AdSidebarProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <AdBanner 
        type="sidebar" 
        position="right" 
        location={location}
        dismissible={true}
      />
      
      <AdBanner 
        type="sidebar" 
        position="left" 
        location={location}
        dismissible={true}
      />
    </div>
  );
};

export default AdSidebar;