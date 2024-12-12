import { useEffect, useCallback } from 'react';

function PerformanceMonitor() {
  const measurePerformance = useCallback(() => {
    if (window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      console.log('Navigation Timing:', {
        DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
        TLS: navigation.connectEnd - navigation.connectStart,
        TTFB: navigation.responseStart - navigation.requestStart,
        DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        Load: navigation.loadEventEnd - navigation.navigationStart
      });

      console.log('Paint Timing:', {
        FP: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
        FCP: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('load', measurePerformance);
    return () => window.removeEventListener('load', measurePerformance);
  }, [measurePerformance]);

  return null;
}

export default PerformanceMonitor;
