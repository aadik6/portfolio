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
    type: 'profile',
    locale: 'en_US',
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
      'FullStack & Node.js Developer from Nepal with 3+ years of experience in React, Next.js, NestJS, and PostgreSQL.',
    images: ['/image.jpeg'],
  },
};

export default function Page() {
  return <Home />;
}
