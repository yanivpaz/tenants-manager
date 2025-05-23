import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import { Home, Settings, LayoutDashboard, Brain } from 'lucide-react'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'NILE INSIGHTS - AI Research Platform',
  description: 'AI-powered research platform by Yuval Avidani, AI Builder & Speaker',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        </head>
        <body className={`${outfit.variable} antialiased`}>
          <ThemeProvider defaultTheme="light" storageKey="yuv-theme">
            <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
              <div className="container mx-auto flex justify-between items-center px-6 h-16">
                <div className="flex items-center space-x-6">
                  {/* Brand Logo/Name - Always visible */}
                  <Link href="/" className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    <span className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
                      NILE INSIGHTS
                    </span>
                  </Link>
                  
                  {/* Navigation Links for Signed In Users */}
                  <SignedIn>
                    <div className="flex items-center space-x-4 ml-6">
                      <Link 
                        href="/" 
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        <span className="font-medium">Home</span>
                      </Link>
                      <Link 
                        href="/dashboard" 
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    </div>
                  </SignedIn>
                </div>
                
                <div className="flex items-center gap-4">
                  <SignedIn>
                    <Link 
                      href="/settings" 
                      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                    <ThemeToggle />
                    <UserButton />
                  </SignedIn>
                  
                  <SignedOut>
                    <ThemeToggle />
                    <SignInButton>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:from-cyan-700 hover:to-blue-700">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                </div>
              </div>
            </header>
            
            {/* Background gradient for signed-in users */}
            <SignedIn>
              <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 -z-10" />
              <div className="fixed inset-0 backdrop-blur-3xl bg-white/10 dark:bg-gray-900/10 -z-10" />
            </SignedIn>
            
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}