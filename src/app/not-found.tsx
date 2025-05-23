import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
      <div className="backdrop-blur-3xl bg-white/10 dark:bg-gray-900/10 p-12 rounded-2xl shadow-xl border border-white/20 text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <SignedIn>
            <Link 
              href="/dashboard"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          
          <SignedOut>
            <Link 
              href="/"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Go to Homepage
            </Link>
          </SignedOut>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Built with ❤️ by Yuval Avidani, AI Builder & Speaker
          <br />
          &quot;Fly High With YUV.AI&quot; 🚀
        </div>
      </div>
    </div>
  )
} 