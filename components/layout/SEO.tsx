import { useEffect } from 'react';
import { Platform } from 'react-native';

export interface SEOProps {
  title: string;
  description?: string;
}

/**
 * Web-only document head. No-op on native. Keeps every route with a
 * proper title for the static export.
 */
export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.title = `${title} — BloodLink`;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
