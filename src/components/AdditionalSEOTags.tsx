/**
 * Additional SEO Meta Tags Component
 * 
 * This component adds additional SEO meta tags that are not covered
 * by the main SEO system, such as preconnect links, favicon links,
 * and other performance-related meta tags.
 * 
 * Author: RGU Hub Development Team
 * Last Updated: 2025
 */

import { useEffect } from 'react';

export const AdditionalSEOTags = () => {
  useEffect(() => {
    // Add preconnect links for performance
    const preconnectLinks = [
      'https://res.cloudinary.com',
      'https://rgu-hub-backend.onrender.com',
      'https://api.rguhub.site'
    ];

    preconnectLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Add DNS prefetch for external domains
    const dnsPrefetchLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    dnsPrefetchLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = href;
      document.head.appendChild(link);
    });

    // Add favicon links
    const faviconSizes = [16, 32, 48, 64, 128, 256];
    faviconSizes.forEach(size => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.sizes = `${size}x${size}`;
      link.href = `/favicon-${size}x${size}.png`;
      document.head.appendChild(link);
    });

    // Add Apple touch icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = '/apple-touch-icon.png';
    document.head.appendChild(appleTouchIcon);

    // Add manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/site.webmanifest';
    document.head.appendChild(manifestLink);

    // Add additional meta tags
    const additionalMetaTags = [
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'RGU Hub' },
      { name: 'application-name', content: 'RGU Hub' },
      { name: 'msapplication-TileColor', content: '#3b82f6' },
      { name: 'msapplication-config', content: '/browserconfig.xml' }
    ];

    additionalMetaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Cleanup function
    return () => {
      // Remove added elements on cleanup
      const addedElements = document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"], link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"], meta[name="format-detection"], meta[name="mobile-web-app-capable"], meta[name="apple-mobile-web-app-capable"], meta[name="apple-mobile-web-app-status-bar-style"], meta[name="apple-mobile-web-app-title"], meta[name="application-name"], meta[name="msapplication-TileColor"], meta[name="msapplication-config"]');
      addedElements.forEach(element => element.remove());
    };
  }, []);

  return null;
};
