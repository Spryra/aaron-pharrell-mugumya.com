import { db } from './client';
import { experience, projects } from './schema';

function validateUrl(url: string | null): void {
  if (url && !url.startsWith('https://')) {
    throw new Error(`Invalid URL: ${url} - URLs must start with 'https://'`);
  }
}

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Validate all URLs before inserting
    const experienceData = [
      {
        company: 'TraceCorp Solutions',
        role: 'AI Specialist (Intern)',
        description: 'Designed and deployed 5 Prophet-based time-series forecasting models within a live ERP platform.',
        descriptionBullets: [
          '5 Prophet-based forecasting models for billing, CRM, and accounting',
          'Anomaly detection for irregular billing patterns',
          'Intelligent ERP chatbot covering 15+ workflows',
          'Deployed to AWS EC2 with multi-tenant architecture',
        ],
        logoUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/tracecorp-logo.png',
        logoAlt: 'TraceCorp Solutions',
        startDate: 'Jan 2026',
        endDate: null,
        sortOrder: 1,
      },
      {
        company: 'ISBAT University',
        role: 'BSc Artificial Intelligence & Machine Learning',
        description: 'Graduated with CGPA 4.38/5.00 with honors.',
        descriptionBullets: [
          'CGPA: 4.38/5.00',
          'Relevant coursework: ML, Deep Learning, NLP, Data Structures & Algorithms',
          'Graduated December 2025',
        ],
        logoUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/isbat-logo.png',
        logoAlt: 'ISBAT University',
        startDate: '2021',
        endDate: 'Dec 2025',
        sortOrder: 2,
      },
    ];

    const projectsData = [
      {
        title: 'EchoTwin',
        slug: 'echotwin',
        description: 'Voice cloning application with 95% synthesis accuracy.',
        content: '# EchoTwin\n\nAn open-source voice cloning application built with PyTorch and Librosa...',
        imageUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/echotwin.png',
        imageAlt: 'EchoTwin voice cloning interface',
        techStack: ['Python', 'PyTorch', 'Librosa', 'Vosk', 'NumPy'],
        githubUrl: 'https://github.com/Spryra/EchoTwin',
        liveUrl: null,
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'HAIQ Bakery Platform',
        slug: 'haiq-bakery',
        description: 'Full-stack e-commerce platform for a Ugandan bakery startup.',
        content: '# HAIQ Bakery\n\nA production full-stack web platform built solo in 2 months...',
        imageUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/haiq.png',
        imageAlt: 'HAIQ Bakery storefront',
        techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
        githubUrl: 'https://github.com/Spryra/HAIQ',
        liveUrl: 'https://haiq-frontend.vercel.app',
        featured: true,
        sortOrder: 2,
      },
      {
        title: 'AceGuru',
        slug: 'aceguru',
        description: 'AI-powered mobile card game with Minimax opponent AI.',
        content: '# AceGuru\n\nA strategic card game built in Flutter with an intelligent opponent...',
        imageUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/aceguru.png',
        imageAlt: 'AceGuru game interface',
        techStack: ['Flutter', 'Dart', 'Minimax AI'],
        githubUrl: 'https://github.com/Spryra/AceGuru',
        liveUrl: null,
        featured: true,
        sortOrder: 3,
      },
    ];

    // Validate URLs
    experienceData.forEach((exp) => validateUrl(exp.logoUrl));
    projectsData.forEach((proj) => {
      validateUrl(proj.imageUrl);
      validateUrl(proj.githubUrl);
      validateUrl(proj.liveUrl);
    });

    // Seed experience - TraceCorp and ISBAT entries
    await db.insert(experience).values(experienceData);

    // Seed projects - EchoTwin, HAIQ, AceGuru
    await db.insert(projects).values(projectsData);

    console.log(`✓ Inserted ${experienceData.length} experience entries and ${projectsData.length} projects`);
  } catch (error) {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  }
}

seed();
