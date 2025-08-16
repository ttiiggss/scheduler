import { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLoggedInAccounts } from '@/hooks/useLoggedInAccounts';
import { useNostrLogin } from '@nostrify/react/login';
import { useToast } from '@/hooks/useToast';

interface ClassroomHeaderProps {
  className?: string;
}

export function ClassroomHeader({ className }: ClassroomHeaderProps) {
  const { currentUser } = useLoggedInAccounts();
  const { removeLogin } = useNostrLogin();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (currentUser) {
      removeLogin(currentUser.id);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
    setIsMenuOpen(false);
  };

  const getInitials = (name?: string, pubkey?: string) => {
    if (name) {
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (pubkey) {
      return pubkey.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Nostr Classroom
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Classes
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Calendar
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              To-Do
            </a>
          </nav>

          {/* User Profile with Logout */}
          {currentUser && (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.metadata.picture} alt={currentUser.metadata.name || 'User'} />
                    <AvatarFallback className="bg-purple-100 text-purple-800">
                      {getInitials(currentUser.metadata.name, currentUser.pubkey)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {currentUser.metadata.name ? (
                      <p className="font-medium">{currentUser.metadata.name}</p>
                    ) : null}
                    {currentUser.metadata.nip05 ? (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {currentUser.metadata.nip05}
                      </p>
                    ) : null}
                  </div>
                </div>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
