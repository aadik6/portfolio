import Home from '../sections/home';

export const metadata = {
  title: 'Aadarsh Kushwaha | FullStack & MERN Developer Nepal',
  description:
    'Aadarsh Kushwaha is a FullStack and Node.js Developer from Nepal with 3+ years of experience building modern, scalable web applications with React, Next.js, TypeScript, NestJS, and PostgreSQL.',
  keywords: [
    'Aadarsh Kushwaha',
    'Aadi Kushwaha',
    'FullStack Developer Nepal',
    'MERN Stack Developer Nepal',
    'Node.js Developer Nepal',
    'NestJS Developer Nepal',
    'React Developer Nepal',
    'TypeScript Developer Nepal',
    'Web Developer Nepal',
    'Frontend Developer Nepal',
    'Backend Developer Nepal',
    'Hire FullStack Developer',
    'Freelance Web Developer Nepal',
    'Birgunj Developer',
    'Kathmandu Developer',
    'Portfolio Aadarsh Kushwaha',
  ],
  alternates: {
    canonical: 'https://aadarshkushwaha.com.np/',
  },
  openGraph: {
    title: 'Aadarsh Kushwaha | FullStack & MERN Developer',
    description:
      'Explore the portfolio, projects, and skills of Aadarsh Kushwaha, a FullStack Developer from Nepal specializing in React, Next.js, Node.js, and NestJS.',
    url: 'https://aadarshkushwaha.com.np/',
    siteName: 'Aadarsh Kushwaha Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/meta-preview.jpg',
        secureUrl: 'https://aadarshkushwaha.com.np/meta-preview.jpg',
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
      'FullStack & Node.js Developer from Nepal with 3+ years of experience in React, Next.js, NestJS, and PostgreSQL.',
    images: ['/meta-preview.jpg'],
  },
};

export default function Page() {
  return <Home />;
}
