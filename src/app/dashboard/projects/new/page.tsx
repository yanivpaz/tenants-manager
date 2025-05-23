import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CreateProjectWizard } from '@/components/dashboard/CreateProjectWizard';

export default async function CreateProjectPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return <CreateProjectWizard userId={userId} />;
} 