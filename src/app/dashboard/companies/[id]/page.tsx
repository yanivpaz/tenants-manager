import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CompanyOverview } from '@/components/dashboard/CompanyOverview';

interface CompanyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const { id } = await params;

  return <CompanyOverview companyId={id} />;
} 