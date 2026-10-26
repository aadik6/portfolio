export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://aadarshkushwaha.com.np';
  const lastModDate = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
