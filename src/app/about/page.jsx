import About from '../../sections/about';

export const metadata = {
  title: 'About Me | Experience & Skills',
  description:
    'Learn about Aadarsh Kushwaha — FullStack & Node.js Developer from Nepal with 3+ years of experience in React, TypeScript, NestJS, and PostgreSQL. View career background, technical skills, and download CV.',
  keywords: [
    'About Aadarsh Kushwaha',
    'Aadarsh Kushwaha Resume',
    'Aadarsh Kushwaha CV',
    'FullStack Developer Experience',
    'Node.js Developer Skills',
    'React TypeScript Developer Nepal',
    'MERN Stack Engineer Background',
    'Web Developer Education Nepal',
  ],
  alternates: {
    canonical: 'https://aadarshkushwaha.com.np/about',
  },
  openGraph: {
    title: 'About Aadarsh Kushwaha | FullStack & Node.js Developer',
    description:
      'Learn about Aadarsh Kushwaha — FullStack Developer with 3+ years of experience in React, TypeScript, NestJS, and PostgreSQL. View background, skills, and download resume.',
    url: 'https://aadarshkushwaha.com.np/about',
    type: 'profile',
    images: [
      {
        url: '/image.jpeg',
        width: 1200,
        height: 630,
        alt: 'About Aadarsh Kushwaha - FullStack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Aadarsh Kushwaha | FullStack Developer',
    description:
      'Background, experience, and full-stack technical skills of Aadarsh Kushwaha.',
    images: ['/image.jpeg'],
  },
};

export default function AboutPage() {
  return <About />;
}
