import { useSeoMeta } from '@unhead/react';
import { ClassroomLayout } from '@/components/ClassroomLayout';
import { ClassroomDashboard } from '@/components/ClassroomDashboard';
import { LoginArea } from '@/components/auth/LoginArea';

const Index = () => {
  useSeoMeta({
    title: 'Nostr Classroom',
    description: 'A Google Classroom clone with Nostr integration for decentralized learning.',
  });

  return (
    <ClassroomLayout>
      <div className="max-w-7xl mx-auto">
        {/* Login Area */}
        <div className="mb-6">
          <LoginArea className="max-w-sm" />
        </div>

        {/* Main Dashboard */}
        <ClassroomDashboard />
      </div>
    </ClassroomLayout>
  );
};

export default Index;
