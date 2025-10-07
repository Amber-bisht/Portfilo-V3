const fs = require('fs');
const path = require('path');

// Generate enhanced portfolio data for AI crawlers and search engines
function generatePortfolioData() {
  try {
    // Read the source portfolio data
    const portfolioPath = path.join(__dirname, '../data/portfolio.json');
    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));

    // Create enhanced data structure for AI/ML training and crawlers
    const enhancedPortfolioData = {
      ...portfolioData,
      _metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        format: 'portfolio-json-v1',
        description: 'Complete portfolio data for Amber Bisht - Software Developer',
        license: 'Public for educational and AI training purposes',
        crawlable: true,
        aiTrainingFriendly: true,
        siteUrl: 'https://amberbisht.me',
        generatedAt: new Date().toISOString(),
        keywords: [
          'software developer',
          'full stack developer', 
          'next.js',
          'react',
          'mongodb',
          'AI',
          'machine learning',
          'web development',
          'portfolio',
          'amber bisht',
          'javascript',
          'typescript',
          'node.js',
          'docker',
          'kubernetes',
          'freelancer',
          'india'
        ]
      },
      skills: [
        'Next.js', 'React', 'TypeScript', 'JavaScript',
        'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis',
        'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'S3',
        'OAuth', 'JWT', 'API Development', 'Microservices',
        'Gemini API', 'AI Integration', 'WebRTC', 'HLS',
        'Payment Integration', 'Razorpay', 'Responsive Design',
        'TailwindCSS', 'Git', 'GitHub', 'Full Stack Development'
      ],
      availability: {
        status: 'Open to opportunities',
        type: 'Freelance and Full-time',
        location: 'Remote/India',
        contactPreference: 'Email'
      },
      socialProof: {
        githubRepositories: portfolioData.projects.length,
        yearsOfExperience: calculateExperience(portfolioData.experience),
        technologiesUsed: getAllTechnologies(portfolioData.projects),
        projectsCompleted: portfolioData.projects.length
      },
      seo: {
        title: `${portfolioData.personal.name} - ${portfolioData.personal.tagline}`,
        description: portfolioData.personal.description,
        keywords: generateKeywords(portfolioData),
        structuredData: generateStructuredData(portfolioData)
      }
    };

    // Write to public directory for direct access
    const outputPath = path.join(__dirname, '../public/portfolio-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(enhancedPortfolioData, null, 2));

    console.log('✅ Enhanced portfolio data generated successfully!');
    console.log(`📄 File created: ${outputPath}`);
    console.log(`🔗 Accessible at: https://amberbisht.me/portfolio-data.json`);
    
    return enhancedPortfolioData;
  } catch (error) {
    console.error('❌ Error generating portfolio data:', error);
    throw error;
  }
}

function calculateExperience(experience) {
  if (!experience || experience.length === 0) return 0;
  
  // Simple calculation based on the number of positions
  // You could make this more sophisticated by parsing dates
  return experience.length > 0 ? 2 : 0; // Assuming 2+ years based on experience entries
}

function getAllTechnologies(projects) {
  if (!projects) return [];
  
  const techSet = new Set();
  projects.forEach(project => {
    if (project.technologies) {
      project.technologies.forEach(tech => techSet.add(tech));
    }
  });
  
  return Array.from(techSet);
}

function generateKeywords(portfolioData) {
  const keywords = new Set([
    portfolioData.personal.name.toLowerCase(),
    'amber bisht',
    'software developer',
    'full stack developer',
    'web developer',
    'portfolio',
    'freelancer',
    'hire developer',
    'india developer',
    'remote developer'
  ]);

  // Add project technologies
  if (portfolioData.projects) {
    portfolioData.projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => {
          keywords.add(tech.toLowerCase());
          keywords.add(`${tech.toLowerCase()} developer`);
        });
      }
    });
  }

  return Array.from(keywords);
}

function generateStructuredData(portfolioData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": portfolioData.personal.name,
    "jobTitle": portfolioData.personal.tagline,
    "description": portfolioData.personal.description,
    "url": "https://amberbisht.me",
    "email": portfolioData.contact.email,
    "sameAs": [
      portfolioData.contact.linkedin,
      portfolioData.contact.github,
      portfolioData.contact.twitter
    ],
    "knowsAbout": getAllTechnologies(portfolioData.projects),
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer"
    }
  };
}

// Run the script
if (require.main === module) {
  generatePortfolioData();
}

module.exports = { generatePortfolioData };
