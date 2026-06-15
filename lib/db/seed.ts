import { db } from './client';
import { experience, projects, blogPosts } from './schema';

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

    const blogPostsData: Array<{
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      coverImageUrl: string;
      coverImageAlt: string;
      tags: string[];
      featured: boolean;
      status: 'draft' | 'published';
      publishedAt: Date;
    }> = [
      {
        title: 'Building Production-Grade AI Forecasting Models',
        slug: 'production-ai-forecasting',
        excerpt: 'How I deployed 5 Prophet-based time-series forecasting models to production within a live ERP platform, handling real-world edge cases and scaling challenges.',
        content: `# Building Production-Grade AI Forecasting Models

## Introduction

At TraceCorp Solutions, I had the opportunity to design and deploy 5 Prophet-based time-series forecasting models within a live ERP platform. This article explores the challenges, solutions, and lessons learned from this production deployment.

## The Challenge

Traditional ERP systems rely on historical data analysis, but they lack the intelligence to predict future trends. The goal was to build forecasting capabilities that could:

- Predict billing trends
- Forecast CRM pipeline value
- Anticipate accounting anomalies
- Handle seasonal variations
- Scale with multi-tenant architecture

## Technical Approach

### Model Selection

We chose Facebook's Prophet library for several reasons:

1. **Robustness**: Handles seasonality and trend changes well
2. **Automation**: Requires minimal hyperparameter tuning
3. **Production-Ready**: Built with production deployments in mind
4. **Uncertainty Quantification**: Provides confidence intervals out of the box

### Architecture

The forecasting pipeline was built as a microservice:

\`\`\`python
# Simplified forecasting service
from prophet import Prophet
import pandas as pd

class ForecastingService:
    def __init__(self):
        self.models = {}

    def train_model(self, tenant_id, data):
        df = pd.DataFrame(data)
        model = Prophet(yearly_seasonality=True)
        model.fit(df)
        self.models[tenant_id] = model
        return model

    def forecast(self, tenant_id, periods=30):
        model = self.models.get(tenant_id)
        if not model:
            raise ValueError(f"No model for tenant {tenant_id}")

        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)
        return forecast
\`\`\`

## Results

The deployment delivered:

- **95%+ accuracy** on billing forecasts (MAPE < 5%)
- **Real-time predictions** for CRM pipeline
- **Anomaly detection** for irregular patterns
- **Multi-tenant isolation** with dedicated models per tenant

## Key Learnings

1. **Data Quality Matters**: Garbage in, garbage out. Extensive data cleaning was essential
2. **Monitor Production Models**: Use continuous retraining to maintain accuracy
3. **Handle Edge Cases**: Missing data, outliers, and seasonality changes require careful handling
4. **Communicate Uncertainty**: Always show confidence intervals to stakeholders

## Conclusion

Building production AI systems is about far more than the algorithm. It requires careful engineering, monitoring, and iteration. The skills I gained here form the foundation of my approach to AI/ML engineering.`,
        coverImageUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-forecasting-hero.jpg',
        coverImageAlt: 'Time series forecasting visualization',
        tags: ['AI', 'Machine Learning', 'Production', 'Python'],
        featured: true,
        status: 'published',
        publishedAt: new Date('2025-12-15'),
      },
      {
        title: 'The Journey from Academia to Production AI',
        slug: 'academia-to-production',
        excerpt: 'Transitioning from university coursework to building real-world AI systems. Here\'s what they don\'t teach you in school.',
        content: `# The Journey from Academia to Production AI

## Where It Started

I graduated with a BSc in AI/ML from ISBAT University with a 4.38/5.00 GPA. I spent four years studying algorithms, neural networks, and mathematical foundations. But nothing quite prepares you for production.

## The Reality Gap

### What University Teaches
- Clean datasets
- Offline training
- Perfect evaluation metrics
- Theoretical optimality

### What Production Requires
- Messy, incomplete data
- Real-time constraints
- Business metrics that matter
- Pragmatic tradeoffs

## My First Month at TraceCorp

Day 1: "You're going to build forecasting models for an ERP system"

By day 30, I realized:

1. **DevOps is underrated**: Getting code into production is harder than writing it
2. **Data engineering is the bottleneck**: 80% of time spent on data pipelines
3. **Monitoring saves lives**: Production breaks at 3 AM without proper alerts
4. **Communication matters more than perfection**: Explaining predictions to stakeholders is an art

## Key Transitions

### From Research to Product
Research optimizes for accuracy. Products optimize for maintainability, speed, and cost. Sometimes a simple model deployed quickly beats a perfect model that's never shipped.

### From Notebooks to Code
Jupyter notebooks are great for exploration but terrible for production. Learning to structure code, write tests, and handle edge cases was crucial.

### From Theory to Pragmatism
I learned to ask: "Is this good enough?" instead of "Is this optimal?"

## Advice for Students

1. **Build things**: Side projects teach more than lectures
2. **Learn DevOps early**: It's not optional in 2025
3. **Talk to users**: Understanding the problem is 90% of the solution
4. **Embrace constraints**: Limitations force creative solutions

## What I'm Learning Now

- Full-stack development (Next.js, React, TypeScript)
- System design and architecture
- Leadership and mentoring
- Business fundamentals

The journey continues...`,
        coverImageUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-journey-hero.jpg',
        coverImageAlt: 'Person working at computer',
        tags: ['Career', 'Learning', 'AI/ML'],
        featured: true,
        status: 'published',
        publishedAt: new Date('2025-12-08'),
      },
      {
        title: 'Building a Full-Stack Bakery E-Commerce Platform in 2 Months',
        slug: 'haiq-bakery-project',
        excerpt: 'From zero to production: How I built and deployed a complete e-commerce platform solo, learning React, Node.js, and PostgreSQL in the process.',
        content: `# Building HAIQ: A Full-Stack E-Commerce Platform

## The Challenge

A local bakery startup needed an online presence. They wanted:
- Product catalog with images
- Shopping cart functionality
- Payment processing
- Order management
- 2-month deadline

I had never built a full e-commerce platform before.

## Tech Stack Decision

### Frontend
- React for component-based UI
- Tailwind CSS for styling
- Redux for state management

### Backend
- Node.js with Express
- PostgreSQL for data
- Stripe for payments

### Deployment
- Vercel for frontend
- Heroku for backend
- AWS S3 for images

## Development Timeline

### Week 1-2: Setup & Core Features
- Project scaffolding
- Database design
- Authentication system
- Basic product pages

### Week 3-4: Cart & Checkout
- Shopping cart functionality
- Stripe integration
- Order management
- Email notifications

### Week 5-6: Polish & Launch
- Performance optimization
- Testing and bug fixes
- Security hardening
- Client feedback implementation

## Key Learnings

### 1. Database Design is Critical
Spent too little time on schema design initially. Good design saves days later.

### 2. Security Matters from Day One
Payment processing requires PCI compliance. Built security in from the start.

### 3. User Testing is Invaluable
The client's feedback shaped features more than my original vision.

## Results

- **Live in 8 weeks**: https://haiq-frontend.vercel.app
- **15% conversion rate**: Better than industry average
- **Happy client**: Extended contract for maintenance

## What I'd Do Differently

1. Use TypeScript from the start
2. Invest more in automated testing
3. Plan API contracts before implementation
4. Consider using Next.js for better DX

## Conclusion

This project transformed me from someone who could code into someone who could ship. The constraints (time, budget, learning curve) forced practical decisions.

The most important lesson: Done is better than perfect.`,
        coverImageUrl: 'https://res.cloudinary.com/aaron-mugumya/image/upload/c_scale,w_1200/blog-haiq-hero.jpg',
        coverImageAlt: 'HAIQ bakery e-commerce platform',
        tags: ['Full-Stack', 'React', 'Node.js', 'E-Commerce'],
        featured: false,
        status: 'published',
        publishedAt: new Date('2025-12-01'),
      },
    ];

    // Validate URLs
    experienceData.forEach((exp) => validateUrl(exp.logoUrl));
    projectsData.forEach((proj) => {
      validateUrl(proj.imageUrl);
      validateUrl(proj.githubUrl);
      validateUrl(proj.liveUrl);
    });
    blogPostsData.forEach((post) => validateUrl(post.coverImageUrl));

    // Seed experience - TraceCorp and ISBAT entries
    await db.insert(experience).values(experienceData);

    // Seed projects - EchoTwin, HAIQ, AceGuru
    await db.insert(projects).values(projectsData);

    // Seed blog posts
    await db.insert(blogPosts).values(blogPostsData);

    console.log(`✓ Inserted ${experienceData.length} experience entries, ${projectsData.length} projects, and ${blogPostsData.length} blog posts`);
  } catch (error) {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  }
}

seed();
