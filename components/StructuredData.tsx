export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Santa Rosa Spas",
    "description": "Premium hot tubs and spa sales in Santa Rosa, California",
    "url": "https://santarosaspas.com",
    "telephone": "(707) 555-1234",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1234 Sonoma Ave",
      "addressLocality": "Santa Rosa",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.4404675",
      "longitude": "-122.7144313"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$$$",
    "image": "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
