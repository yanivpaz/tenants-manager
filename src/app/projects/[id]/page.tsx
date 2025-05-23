import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ProjectLayout } from '@/components/project/ProjectLayout';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const { id } = await params;

  return <ProjectLayout projectId={id} userId={userId} />;
} 