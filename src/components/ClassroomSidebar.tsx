import { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  Plus,
  ChevronDown,
  ChevronRight,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ClassroomSidebarProps {
  className?: string;
}

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  children?: SidebarItem[];
}

export function ClassroomSidebar({ className }: ClassroomSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['my-courses']);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Home',
      icon: <Home className="h-5 w-5" />,
      href: '/'
    },
    {
      name: 'My Courses',
      icon: <BookOpen className="h-5 w-5" />,
      href: '/courses',
      children: [
        { name: 'Mathematics', icon: <BookOpen className="h-4 w-4" />, href: '/courses/math' },
        { name: 'Science', icon: <BookOpen className="h-4 w-4" />, href: '/courses/science' },
        { name: 'History', icon: <BookOpen className="h-4 w-4" />, href: '/courses/history' },
        { name: 'Literature', icon: <BookOpen className="h-4 w-4" />, href: '/courses/literature' },
      ]
    },
    {
      name: 'Calendar',
      icon: <Calendar className="h-5 w-5" />,
      href: '/calendar',
      badge: '3'
    },
    {
      name: 'Classwork',
      icon: <FileText className="h-5 w-5" />,
      href: '/classwork'
    },
    {
      name: 'People',
      icon: <Users className="h-5 w-5" />,
      href: '/people'
    },
    {
      name: 'Messages',
      icon: <MessageSquare className="h-5 w-5" />,
      href: '/messages',
      badge: '5'
    },
    {
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings'
    }
  ];

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.name);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.name}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700",
            level > 0 && "ml-4"
          )}
          onClick={() => hasChildren && toggleExpanded(item.name)}
        >
          <span className="mr-3">{item.icon}</span>
          <span className="flex-1 text-left">{item.name}</span>
          {item.badge && (
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <span className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
        </Button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn("w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col", className)}>
      <div className="p-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
          <Plus className="mr-2 h-4 w-4" />
          Join Class
        </Button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Nostr Classroom v1.0
        </div>
      </div>
    </aside>
  );
}