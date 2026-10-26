import '../index.css';
import '../App.css';
import Header from '../component/header';
import Footer from '../component/footer';
import MessageIcon from '../component/messageIcon';

const siteUrl = 'https://aadarshkushwaha.com.np';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aadarsh Kushwaha | FullStack & MERN Developer',
    template: '%s | Aadarsh Kushwaha',
  },
  description:
    'Official portfolio of Aadarsh Kushwaha, a FullStack and Node.js Developer from Nepal with 3+ years of experience specializing in React, Next.js, TypeScript, NestJS, MongoDB, and PostgreSQL.',
  keywords: [
    'Aadarsh Kushwaha',
    'Aadi Kushwaha',
    'FullStack Developer Nepal',
    'MERN Stack Developer Nepal',
    'Node.js Developer Nepal',
    'NestJS Developer Nepal',
    'React Developer Nepal',
    'Next.js Developer Nepal',
    'TypeScript Developer Nepal',
    'JavaScript Developer',
    'Web Developer Nepal',
    'Frontend Engineer Nepal',
    'Backend Developer Nepal',
    'PostgreSQL Developer',
    'MongoDB Developer',
    'Hire FullStack Developer Nepal',
    'Birgunj Web Developer',
    'Kathmandu Web Developer',
    'Freelance FullStack Engineer',
    'Modern Web Development',
  ],
  authors: [{ name: 'Aadarsh Kushwaha', url: siteUrl }],
  creator: 'Aadarsh Kushwaha',
  publisher: 'Aadarsh Kushwaha',
  category: 'technology',
  classification: 'Portfolio & Software Development',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/yellow.png', sizes: '32x32', type: 'image/png' },
      { url: '/fv.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/yellow.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Aadarsh Kushwaha Portfolio',
    title: 'Aadarsh Kushwaha | FullStack & MERN Developer',
    description:
      'Aadarsh Kushwaha is a FullStack & Node.js Developer from Nepal with 3+ years of experience building modern, responsive web apps with React, Next.js, and NestJS.',
    images: [
      {
        url: '/image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Aadarsh Kushwaha - FullStack & MERN Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadarsh Kushwaha | FullStack & MERN Developer',
    description:
      'FullStack & Node.js developer from Nepal with 3+ years of experience building modern web applications.',
    images: ['/image.jpeg'],
  },
};

export const viewport = {
  themeColor: '#011627',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Aadarsh Kushwaha',
      alternateName: ['Aadi Kushwaha', 'Aadi', 'aadik6'],
      jobTitle: 'FullStack Developer',
      description:
        'FullStack and Node.js Developer with 3+ years of experience specializing in React, Next.js, TypeScript, NestJS, Express, MongoDB, and PostgreSQL.',
      url: siteUrl,
      image: `${siteUrl}/image.jpeg`,
      email: 'mailto:aadarshkumarman@gmail.com',
      telephone: '+977-9806814329',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Birgunj',
        addressCountry: 'Nepal',
      },
      sameAs: [
        'https://github.com/aadik6',
        'https://www.linkedin.com/in/aadarsh-kushwaha-09a9451b4/',
        'https://www.instagram.com/iamyouraadi/',
        'https://www.facebook.com/aadarshaadman6264',
      ],
      knowsAbout: [
        'Full Stack Development',
        'MERN Stack',
        'React.js',
        'Next.js',
        'Node.js',
        'NestJS',
        'Express.js',
        'TypeScript',
        'JavaScript',
        'MongoDB',
        'PostgreSQL',
        'Tailwind CSS',
        'RESTful APIs',
        'Zustand',
        'TanStack Query',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Aadarsh Kushwaha Portfolio',
      description:
        'Explore the projects, technical skills, and resume of Aadarsh Kushwaha, FullStack Developer from Nepal.',
      inLanguage: 'en',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Aadarsh Kushwaha - Developer Profile',
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>
        <noscript>
          <strong>This website works best with JavaScript enabled.</strong>
        </noscript>
        <Header />
        <main>{children}</main>
        <MessageIcon />
        <Footer />
      </body>
    </html>
  );
}
