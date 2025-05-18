# 🚀 YUV.AI NextJS Boilerplate

> 🌟 **A beginner-friendly starter kit for your next awesome web project!** 🌟

This boilerplate gives you everything you need to build beautiful, modern web applications with NextJS, authentication, database, and stunning UI components - all pre-configured and ready to use!

![GitHub stars](https://img.shields.io/github/stars/hoodini/yuv-nextjs-boilerplate?style=social)
![GitHub forks](https://img.shields.io/github/forks/hoodini/yuv-nextjs-boilerplate?style=social)
![NPM Downloads](https://img.shields.io/npm/dt/yuv-nextjs-boilerplate?style=social)

## ✨ What's Inside?

- 🔥 **NextJS 15+** - The latest React framework with App Router
- 🔒 **Authentication** - User login/signup with [Clerk](https://clerk.com)
- 💾 **MongoDB Atlas** - Easy database setup for storing your app data
- 🎨 **Shadcn UI** - Beautiful, accessible UI components
- 🌈 **Tailwind CSS** - Style your app without writing tons of CSS
- 📝 **TypeScript** - Catch errors before your users do!
- 🌓 **Dark Mode** - Toggle between light and dark themes with one click
- 📱 **Mobile-First** - Looks amazing on any device

## 🚀 Getting Started

### 🔧 What You'll Need

- 💻 **Node.js** (v18 or newer)
- 📦 **npm**, **yarn**, or **pnpm** (package managers)
- 🔑 Free [Clerk account](https://clerk.com) for authentication
- 🗄️ Free [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) or local MongoDB

Don't worry if you're new to these tools - we'll guide you through the setup! 😊

### 🛠️ Choose Your Installation Method

#### 👇 Option 1: One Command Setup (Easiest!)

```bash
# ✨ Create a new project with one command
npx create-yuv-app my-cool-project

# 📂 Go to your new project folder
cd my-cool-project

# 📝 Set up your environment variables
cp .env.example .env.local

# ▶️ Start the development server
npm run dev
```

#### 👇 Option 2: Download with Git

##### 🐧 Linux/Mac Users:

```bash
# 📥 Run the installer script (it will ask for your project name)
curl -L https://raw.githubusercontent.com/hoodini/yuv-nextjs-boilerplate/main/install.sh | bash
```

##### 🪟 Windows Users:

```bash
# 📥 Download the installer script
curl -L https://raw.githubusercontent.com/hoodini/yuv-nextjs-boilerplate/main/install.bat -o install.bat

# 🚀 Run the installer
install.bat
```

##### 🛠️ Manual Setup (if you prefer more control):

```bash
# 📥 Clone the project
git clone https://github.com/hoodini/yuv-nextjs-boilerplate.git my-project

# 📂 Go to the project folder
cd my-project

# 🧹 Remove the existing git history
rm -rf .git

# 🌱 Start a fresh git repository
git init

# 📦 Install all dependencies
npm install

# 📝 Create your environment file
cp .env.example .env.local

# ▶️ Start the development server
npm run dev
```

#### 👇 Option 3: Docker (with built-in MongoDB)

```bash
# 📥 Clone the project
git clone https://github.com/hoodini/yuv-nextjs-boilerplate.git my-project
cd my-project

# 🐳 Start everything with Docker
docker-compose up -d

# ✨ Your app is now running at http://localhost:3000
# 🗄️ MongoDB is available at mongodb://localhost:27017/myapp
```

#### 🐳 Helpful Docker Commands

```bash
# 📜 View application logs
docker-compose logs -f app

# ⏹️ Stop all containers
docker-compose down

# 🔄 Rebuild after making changes
docker-compose up -d --build
```

### 🔑 Setting Up Your Environment

After installation, you'll need to add your credentials to the `.env.local` file:

```env
# 🗄️ MongoDB Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

# 🔒 Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

> 💡 **Tip for Beginners**: Don't worry if this looks complicated! We'll walk you through getting these values in the MongoDB Setup section below.

### ▶️ Running Your App

```bash
# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see your new app! 🎉

## 📁 Project Structure 

```
yuv-nextjs-boilerplate/
├── 🔒 .clerk/             # Clerk authentication config
├── 🖼️ public/             # Images and other static files
├── 📂 src/
│   ├── 📱 app/            # Pages and routes
│   │   ├── 🔌 api/        # API endpoints
│   │   │   ├── 🩺 health/  # Health check endpoint
│   │   │   └── 🗄️ mongodb/ # MongoDB API endpoints
│   │   └── 🏠 page.tsx    # Home page
│   └── 🧰 lib/            # Utility functions
│       └── 📊 models/     # MongoDB data models
├── 📝 .env.example        # Example environment variables
├── ⚙️ components.json     # Shadcn UI components config
└── 📚 ...                 # Other config files
```

> 💡 **For Beginners**: This structure follows the Next.js App Router pattern. Don't worry about understanding everything right away - you'll get familiar with it as you work on your project!

## 🎓 Beginner's Guide to MongoDB Setup

Never used MongoDB before? No problem! Follow these steps:

1. 📝 **Sign Up**: Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. 🔨 **Create a Cluster**: Click "Build a Database" and choose the free tier
3. 🔐 **Create a User**: In the Security tab, add a database user with a username and password
4. 🌐 **Set Network Access**: In Network Access, add your IP address or allow access from anywhere (for development)
5. 🔗 **Get Connection String**: In the Database tab, click "Connect" > "Connect your application"
6. 📋 **Copy the connection string**: It will look like `mongodb+srv://username:password@cluster...`
7. 📝 **Update your .env.local file**: Replace the placeholder in `MONGODB_URI` with your string

You can test if everything's working by visiting:
```
http://localhost:3000/api/health
```

If you see a success message - congratulations! 🎉 Your database is connected!

## 🐳 Docker Deployment

Want to deploy your app using Docker? It's ready to go!

```bash
# Build your Docker image
docker build -t my-nextjs-app .

# Run your container
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri my-nextjs-app

# Or use Docker Compose (comes with MongoDB)
docker-compose up -d
```

## 🧩 Adding New Features

This boilerplate is built to be extended! Some ideas for what to add next:

- ✅ Create a Todo list feature
- 👤 Add user profiles
- 📱 Build a mobile app with React Native
- 📊 Add data visualization with charts
- 📝 Create a blog system

## 📚 Learning Resources

New to some of these technologies? Check out these resources:

- 🔰 [Next.js Foundations Course](https://nextjs.org/learn) - Free interactive tutorial
- 📘 [MongoDB Basics](https://university.mongodb.com/courses/M001/about) - Free MongoDB course
- 🎨 [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=UBOj6rqRUME) - YouTube video
- 🔧 [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) - Official guide

## 📝 License

Created with ❤️ by [Yuval Avidani](https://linktr.ee/yuvaladani), AI Builder & Speaker.

> "Fly High With YUV.AI" 🚀

## 🤝 Contributing

Found a bug or want to add a feature? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## 🙏 Credits

Developed with ❤️ by [Yuval Avidani](https://linktr.ee/yuvaladani)

---

Happy coding! If you build something cool with this boilerplate, I'd love to see it! 🚀
