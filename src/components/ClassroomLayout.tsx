import { ClassroomHeader } from './ClassroomHeader';
import { ClassroomSidebar } from './ClassroomSidebar';
import { cn } from '@/lib/utils';

interface ClassroomLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ClassroomLayout({ children, className }: ClassroomLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ClassroomHeader />
      <div className="flex">
        <ClassroomSidebar />
        <main className={cn("flex-1 p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}