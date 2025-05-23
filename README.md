# 🌊 Nile Insights

<div align="center">
  <h3>Unlock the Power of Data-Driven Insights</h3>
  <p><em>"Fly High With YUV.AI"</em></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-green)](https://www.mongodb.com/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)](https://clerk.com/)
</div>

## ✨ Overview

Nile Insights is a cutting-edge Next.js application designed for advanced project management and research design with AI-powered analytics. Built with modern web technologies and a focus on user experience, scalability, and security.

## 🚀 Features

### 🎯 Core Functionality
- **Project Management**: Comprehensive project tracking and management system
- **Research Design**: Advanced research methodology tools and templates
- **Dashboard Analytics**: Beautiful, interactive dashboards with real-time data
- **Company Management**: Multi-company support with detailed profiles
- **Data Visualization**: Stunning charts and graphs powered by shadcn/ui

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with 100% responsive layouts
- **Dark/Light Mode**: One-click theme switching with smooth transitions
- **Accessibility**: WCAG compliant with support for color blindness
- **Animations**: Smooth, delightful animations throughout the interface
- **Glass Morphism**: Beautiful glass-blur-gradient backgrounds
- **Collapsible Sidebar**: Space-efficient navigation with personalized welcome messages

### 🔒 Security & Performance
- **OWASP Top 10 Compliance**: Industry-standard security measures
- **Server Actions**: Secure server-side operations
- **Authentication**: Robust auth system powered by Clerk
- **Database Integration**: Seamless MongoDB integration
- **SEO Optimized**: Built-in SEO best practices

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: Framer Motion & Tailwind animations

### Backend
- **API**: Next.js API Routes & Server Actions
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **Deployment**: Docker ready with compose setup

### Development Tools
- **Code Quality**: ESLint + Prettier
- **Type Safety**: TypeScript with strict mode
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

## 📂 Project Structure

```
yuv-nextjs-boilerplate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── health/        # Health check endpoint
│   │   │   ├── mongodb/       # Database operations
│   │   │   ├── projects/      # Project management APIs
│   │   │   └── seed/          # Database seeding
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── companies/     # Company management
│   │   │   ├── projects/      # Project management
│   │   │   └── research-design/ # Research tools
│   │   ├── projects/          # Project detail pages
│   │   ├── sign-in/           # Authentication pages
│   │   └── sign-up/
│   ├── components/            # Reusable components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── project/           # Project-related components
│   │   ├── research/          # Research design components
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       └── models/            # Database models
├── public/                    # Static assets
├── bin/                       # Scripts and utilities
├── docker-compose.yml         # Docker composition
├── Dockerfile                 # Container configuration
└── package.json              # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB instance
- Clerk account for authentication

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hoodini/nile-insights.git
   cd nile-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🐳 Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **For production deployment**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## 📱 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 🗄️ Database Setup

The application uses MongoDB with automatic model creation. Ensure your MongoDB instance is running and accessible via the connection string in your `.env.local` file.

### Seeding Data
```bash
# Run the seed script to populate initial data
curl http://localhost:3000/api/seed
```

## 🔐 Authentication

This project uses Clerk for authentication, providing:
- Social login (Google, GitHub, etc.)
- Email/password authentication
- Multi-factor authentication
- User management dashboard
- Session management

## 🎨 Design System

Built with a comprehensive design system featuring:
- **Color Palette**: Carefully curated colors with dark/light mode support
- **Typography**: Readable, accessible font hierarchy
- **Components**: Consistent, reusable UI components
- **Animations**: Smooth, purposeful micro-interactions
- **Responsive Grid**: Mobile-first responsive layout system

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
Use the included Dockerfile and docker-compose.yml for containerized deployment.

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom color palette
- Extended animations
- Responsive breakpoints
- Custom utilities

### Next.js
Configuration in `next.config.ts` with:
- Image optimization
- API routes
- Build optimizations
- Security headers

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Minimized with code splitting and tree shaking
- **Database**: Optimized queries with proper indexing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Yuval Avidani** - AI Builder & Speaker

- 🌐 [Linktree](https://linktr.ee/yuval-avidani)
- 🐦 [Twitter](https://twitter.com/yuval-avidani)
- 📷 [Instagram](https://instagram.com/yuval-avidani)
- 📝 [Blog](https://yuv.ai/blog)

---

<div align="center">
  <p><strong>"Fly High With YUV.AI"</strong></p>
  <p>🔥 Built with passion for creating magical user experiences 🔥</p>
</div>
