import React from 'react';
import { Bell, Search, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

/**
 * Admin Header Component
 * Top navigation bar for admin portal with profile, notifications, and search
 */
export function AdminHeader() {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search submitted');
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search issues, citizens, reports..."
                className="pl-10 w-80 bg-muted/30 border-border/50 focus:bg-background"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Button for Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="font-medium">New high priority issue</div>
                <div className="text-sm text-muted-foreground">
                  Water leakage reported in Chandrasekharpur
                </div>
                <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="font-medium">Issue resolved</div>
                <div className="text-sm text-muted-foreground">
                  Street light repair completed in Jaydev Vihar
                </div>
                <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="font-medium">New citizen registered</div>
                <div className="text-sm text-muted-foreground">
                  Priya Sharma joined the platform
                </div>
                <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Admin Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@civicportal.gov
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}