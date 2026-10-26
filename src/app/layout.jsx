import '../index.css';
import '../App.css';
import 'remixicon/fonts/remixicon.css';
import '../component/header.css';
import '../component/footer.css';
import '../sections/about.css';
import '../sections/project.css';
import '../sections/contact.css';
import '../sections/home.css';
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
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Aadarsh Kushwaha Portfolio',
    title: 'Aadarsh Kushwaha | FullStack & MERN Developer',
    description:
      'Aadarsh Kushwaha is a FullStack & Node.js Developer from Nepal with 3+ years of experience building modern, responsive web apps with React, Next.js, and NestJS.',
    images: [
      {
        url: '/meta-preview.jpg',
        secureUrl: `${siteUrl}/meta-preview.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Aadarsh Kushwaha - FullStack & MERN Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadarsh Kushwaha | FullStack & MERN Developer',
    description:
      'FullStack & Node.js developer from Nepal with 3+ years of experience building modern web applications.',
    images: ['/meta-preview.jpg'],
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
      image: `${siteUrl}/meta-preview.jpg`,
      email: 'mailto:aadarshkumarman@gmail.com',
      telephone: '+977-9806814329',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Birgunj',
        addressRegion: 'Madhesh Province',
        addressCountry: 'Nepal',
      },
      nationality: 'Nepali',
      knowsLanguage: ['English', 'Nepali', 'Hindi'],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'FullStack Software Engineer',
        occupationalCategory: '15-1252.00',
        skills:
          'React, Next.js, TypeScript, Node.js, NestJS, Express.js, PostgreSQL, MongoDB, Tailwind CSS, REST APIs, Zustand, TanStack Query',
      },
      offers: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FullStack Web Application Development',
            description:
              'End-to-end web engineering from responsive React & Next.js user interfaces to scalable NestJS & Node.js backend architectures.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'RESTful API & Database Architecture',
            description:
              'Designing secure, high-performance APIs and database models using PostgreSQL, MongoDB, and modern Node.js/NestJS frameworks.',
          },
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'mailto:aadarshkumarman@gmail.com',
        telephone: '+977-9806814329',
        contactType: 'professional inquiries',
        availableLanguage: ['English', 'Nepali', 'Hindi'],
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
        'Firebase',
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
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
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
