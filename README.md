# YUV.AI NextJS Boilerplate

A clean, minimal foundation to build your next project with NextJS, Clerk for authentication, MongoDB Atlas for database, Shadcn UI components, and Tailwind CSS for styling.

## 🚀 Features

- **NextJS 15+** - Latest Next.js with App Router
- **Authentication** - Secure user authentication with Clerk
- **MongoDB Atlas** - Scalable database integration
- **Shadcn UI** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe code
- **Dark Mode** - Beautiful dark/light theme support
- **Responsive Design** - Mobile-first approach

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn or pnpm
- MongoDB Atlas account (or local MongoDB for development)
- Clerk account

### Installation Options

#### Option 1: NPX (Quickest)

```bash
npx create-yuv-app my-app
cd my-app
```

#### Option 2: Git Clone

```bash
# Clone using the convenience script (Linux/Mac)
curl -L https://raw.githubusercontent.com/hoodini/yuv-nextjs-boilerplate/main/install.sh | bash

# OR using the Windows batch script
curl -L https://raw.githubusercontent.com/hoodini/yuv-nextjs-boilerplate/main/install.bat -o install.bat && install.bat

# OR manually
git clone https://github.com/hoodini/yuv-nextjs-boilerplate.git my-app
cd my-app
npm install
```

#### Option 3: Docker (with local MongoDB)

```bash
# Clone the repository
git clone https://github.com/hoodini/yuv-nextjs-boilerplate.git my-app
cd my-app

# Start with Docker Compose
docker-compose up -d
```

### Setting Up Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your MongoDB connection string and Clerk credentials:

```env
# MongoDB Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Project Structure

```
mybp/
├── .clerk/               # Clerk authentication config
├── public/               # Static assets
├── src/
│   ├── app/              # App router pages
│   │   ├── api/          # API routes
│   │   │   ├── health/   # Health check endpoint
│   │   │   └── mongodb/  # MongoDB API endpoints
│   │   └── page.tsx      # Home page
│   └── lib/              # Utility functions
│       └── models/       # MongoDB models
├── .env.example          # Example environment variables
├── components.json       # Shadcn UI components config
└── ...                   # Other config files
```

## 🐳 Docker Deployment

This project includes Docker configuration for easy deployment:

```bash
# Build and run the Docker image
docker build -t yuv-nextjs-app .
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri yuv-nextjs-app

# Or using Docker Compose (includes MongoDB)
docker-compose up -d
```

## 📝 License

This project is created by [Yuval Avidani](https://linktr.ee/yuvaladani), AI Builder & Speaker.

"Fly High With YUV.AI"

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/docs)

## 🙏 Credits

Developed with ❤️ by [Yuval Avidani](https://linktr.ee/yuvaladani)

## MongoDB Setup

This project is set up to use MongoDB Atlas. Follow these steps to configure your database:

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient for development)
3. In the Security tab, create a database user and set up network access
4. In the Database tab, click "Connect" on your cluster, and select "Connect your application"
5. Copy your connection string
6. Create a `.env.local` file in the root of your project based on `.env.example`
7. Replace the placeholder in `MONGODB_URI` with your connection string

Once you've set up your MongoDB connection string in `.env.local`, the application will automatically connect to your database.

You can test the MongoDB connection by visiting the health check endpoint:
```
http://localhost:3000/api/health
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
