import Contact from '../../sections/contact';

export const metadata = {
  title: 'Contact & Hire | FullStack Developer',
  description:
    'Get in touch with Aadarsh Kushwaha for FullStack web development projects, freelance opportunities, or full-time roles in Nepal and worldwide. Send a message directly.',
  keywords: [
    'Contact Aadarsh Kushwaha',
    'Hire FullStack Developer Nepal',
    'Hire React Developer Nepal',
    'Hire Node.js Developer',
    'Freelance Web Developer Birgunj',
    'Web Development Inquiries Nepal',
    'Aadarsh Kushwaha Email Phone',
  ],
  alternates: {
    canonical: 'https://aadarshkushwaha.com.np/contact',
  },
  openGraph: {
    title: 'Contact & Hire Aadarsh Kushwaha | FullStack Developer',
    description:
      'Get in touch with Aadarsh Kushwaha for FullStack development, freelance contracts, or technical collaborations.',
    url: 'https://aadarshkushwaha.com.np/contact',
    type: 'website',
    images: [
      {
        url: '/image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Contact Aadarsh Kushwaha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Aadarsh Kushwaha | FullStack Developer',
    description:
      'Connect with Aadarsh Kushwaha for software engineering and web development opportunities.',
    images: ['/image.jpeg'],
  },
};

export default function ContactPage() {
  return <Contact />;
}
