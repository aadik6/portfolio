import Project from '../../sections/project';

export const metadata = {
  title: 'Projects & Work Portfolio',
  description:
    'Explore full-stack web development projects built by Aadarsh Kushwaha: BirgunjByte News Portal, SkyWatch Weather App, MediConnect, and custom E-commerce Admin Suites.',
  keywords: [
    'Aadarsh Kushwaha Projects',
    'BirgunjByte News Portal',
    'SkyWatch Weather App',
    'MediConnect Healthcare App',
    'MERN Stack Projects',
    'React FullStack Projects',
    'Node.js Web Applications',
    'Web Development Portfolio Nepal',
  ],
  alternates: {
    canonical: 'https://aadarshkushwaha.com.np/projects',
  },
  openGraph: {
    title: 'Projects & Work | Aadarsh Kushwaha',
    description:
      'Explore full-stack web applications and portals created by Aadarsh Kushwaha using React, TypeScript, Node.js, and modern APIs.',
    url: 'https://aadarshkushwaha.com.np/projects',
    type: 'website',
    images: [
      {
        url: '/image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Aadarsh Kushwaha Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Aadarsh Kushwaha',
    description:
      'Discover dynamic web applications and portals developed by Aadarsh Kushwaha.',
    images: ['/image.jpeg'],
  },
};

export default function ProjectsPage() {
  return <Project />;
}
