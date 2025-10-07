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
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
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

interface StructuredDataProps {
  portfolioData: PortfolioData;
  pageType?: 'homepage' | 'project' | 'contact' | 'experience';
  projectData?: any;
}

export default function StructuredData({ portfolioData, pageType = 'homepage', projectData }: StructuredDataProps) {
  const router = useRouter();
  const baseUrl = 'https://amberbisht.me';
  const currentUrl = `${baseUrl}${router.asPath}`;

  // Person Schema (always included)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    "name": portfolioData.personal.name,
    "alternateName": ["Amber Bisht", "Software Developer"],
    "description": portfolioData.personal.description,
    "jobTitle": portfolioData.personal.tagline,
    "url": baseUrl,
    "image": `${baseUrl}/images/profile.jpg`,
    "sameAs": [
      portfolioData.contact.linkedin,
      portfolioData.contact.github,
      portfolioData.contact.twitter,
      ...(portfolioData.contact.instagram ? [portfolioData.contact.instagram] : [])
    ],
    "email": portfolioData.contact.email,
    "address": {
      "@type": "Place",
      "addressLocality": portfolioData.contact.location
    },
    "knowsAbout": [
      "Software Development",
      "Web Development", 
      "Full Stack Development",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AI Integration",
      "Machine Learning",
      "API Development",
      "Microservices"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "description": "Full-stack web developer specializing in modern JavaScript frameworks and AI integration",
      "skills": ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "Docker", "AI/ML"]
    }
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}#service`,
    "name": "Amber Bisht - Software Development Services",
    "description": "Professional software development services including web applications, AI integration, and full-stack solutions",
    "provider": {
      "@id": `${baseUrl}#person`
    },
    "serviceType": "Software Development",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Stack Web Development",
            "description": "Complete web application development using modern technologies"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration Services",
            "description": "Integration of AI and machine learning capabilities into web applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "API Development",
            "description": "RESTful API development and microservices architecture"
          }
        }
      ]
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    "url": baseUrl,
    "name": `${portfolioData.personal.name} - Portfolio`,
    "description": portfolioData.personal.description,
    "publisher": {
      "@id": `${baseUrl}#person`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/api/portfolio?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Portfolio/Creative Work Collection
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "@id": `${baseUrl}#portfolio`,
    "name": `${portfolioData.personal.name} - Project Portfolio`,
    "description": "Collection of software development projects and applications",
    "creator": {
      "@id": `${baseUrl}#person`
    },
    "hasPart": portfolioData.projects.map(project => ({
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/projects/${project.id}`,
      "name": project.title,
      "description": project.description,
      "url": project.live,
      "codeRepository": project.github,
      "programmingLanguage": project.technologies,
      "creator": {
        "@id": `${baseUrl}#person`
      },
      "image": `${baseUrl}${project.image}`
    }))
  };

  // Work Experience Schema
  const workExperienceSchema = portfolioData.experience.map(exp => ({
    "@context": "https://schema.org",
    "@type": "WorkExperience",
    "identifier": exp.company.toLowerCase().replace(/\s+/g, '-'),
    "hasOccupation": {
      "@type": "Occupation",
      "name": exp.position
    },
    "worksFor": {
      "@type": "Organization",
      "name": exp.company
    },
    "description": exp.description,
    "startDate": exp.duration.split(' - ')[0],
    "endDate": exp.duration.includes('Present') ? new Date().toISOString() : exp.duration.split(' - ')[1],
    "employee": {
      "@id": `${baseUrl}#person`
    }
  }));

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      ...(pageType === 'project' && projectData ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${baseUrl}#projects`
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": projectData.title,
        "item": currentUrl
      }] : [])
    ]
  };

  // Combine all schemas
  const allSchemas = [
    personSchema,
    professionalServiceSchema,
    websiteSchema,
    portfolioSchema,
    breadcrumbSchema,
    ...workExperienceSchema
  ];

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allSchemas)
        }}
      />
    </Head>
  );
}
