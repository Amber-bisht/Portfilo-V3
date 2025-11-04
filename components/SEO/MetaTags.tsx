import Head from 'next/head';
import { useRouter } from 'next/router';

interface PortfolioData {
  personal: {
    name: string;
    tagline: string;
    description: string;
  };
  projects: Array<{
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    github: string;
    live: string;
  }>;
  contact: {
    email: string;
    location: string;
    linkedin: string;
    github: string;
    twitter: string;
    telegram?: string;
    instagram?: string;
  };
}

interface MetaTagsProps {
  portfolioData: PortfolioData;
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
  pageType?: 'website' | 'profile' | 'article';
  noIndex?: boolean;
}

export default function MetaTags({ 
  portfolioData, 
  pageTitle, 
  pageDescription, 
  pageImage,
  pageType = 'website',
  noIndex = false 
}: MetaTagsProps) {
  const router = useRouter();
  const baseUrl = 'https://amberbisht.me';
  const currentUrl = `${baseUrl}${router.asPath}`;
  
  const title = pageTitle || `${portfolioData.personal.name} - ${portfolioData.personal.tagline}`;
  const description = pageDescription || portfolioData.personal.description;
  const image = pageImage || `${baseUrl}/images/og-image.jpg`;
  
  // Extract Twitter handle from URL
  const twitterHandle = portfolioData.contact.twitter.split('/').pop() || 'amber_bisht';
  
  // Generate comprehensive keywords
  const keywords = [
    portfolioData.personal.name.toLowerCase(),
    'amber bisht',
    'software developer',
    'full stack developer',
    'web developer',
    'next.js developer',
    'react developer',
    'javascript developer',
    'typescript developer',
    'node.js developer',
    'mongodb developer',
    'ai integration',
    'machine learning',
    'portfolio',
    'freelancer',
    'web applications',
    'api development',
    'microservices',
    'docker',
    'kubernetes',
    'ci/cd',
    'open source',
    'india developer',
    'remote developer',
    'hire developer',
    ...portfolioData.projects.flatMap(p => 
      p.technologies.map(tech => tech.toLowerCase())
    )
  ].filter((value, index, self) => self.indexOf(value) === index).join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={portfolioData.personal.name} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={`${portfolioData.personal.name} - Portfolio`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Profile specific (if person/profile) */}
      {pageType === 'profile' && (
        <>
          <meta property="profile:first_name" content={portfolioData.personal.name.split(' ')[0]} />
          <meta property="profile:last_name" content={portfolioData.personal.name.split(' ').slice(1).join(' ')} />
          <meta property="profile:username" content="amber_bisht" />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={`@${twitterHandle}`} />
      <meta name="twitter:site" content={`@${twitterHandle}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content={portfolioData.contact.linkedin} />
      
      {/* Telegram */}
      {portfolioData.contact.telegram && (
        <meta property="telegram:channel" content={portfolioData.contact.telegram} />
      )}
      
      {/* Additional AI-Friendly Meta Tags */}
      <meta name="subject" content="Software Developer Portfolio" />
      <meta name="topic" content="Web Development, Software Engineering, AI Integration" />
      <meta name="summary" content={description} />
      <meta name="Classification" content="Personal Portfolio" />
      <meta name="designer" content={portfolioData.personal.name} />
      <meta name="owner" content={portfolioData.personal.name} />
      <meta name="url" content={currentUrl} />
      <meta name="identifier-URL" content={currentUrl} />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate Formats */}
      <link rel="alternate" type="application/json" href={`${baseUrl}/api/portfolio`} title="Portfolio Data JSON" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn-icons-png.flaticon.com" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://linkedin.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//cdn-icons-png.flaticon.com" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      
      {/* Favicons */}
      <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
      <link rel="shortcut icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
      <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Additional Schema.org hints */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
    </Head>
  );
}
