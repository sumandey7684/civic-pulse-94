import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  FileText, 
  Settings, 
  Map,
  BarChart3,
  Shield
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

/**
 * Admin Sidebar Component
 * Navigation sidebar for admin portal with management features
 */
export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const navigationItems = [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      title: 'Manage Issues',
      url: '/admin/issues',
      icon: AlertTriangle,
      description: 'Issue Management'
    },
    {
      title: 'Citizens',
      url: '/admin/citizens',
      icon: Users,
      description: 'Citizen Management'
    },
    {
      title: 'Reports',
      url: '/admin/reports',
      icon: FileText,
      description: 'Generate Reports'
    },
    {
      title: 'Analytics',
      url: '/admin/analytics',
      icon: BarChart3,
      description: 'Data Insights'
    },
    {
      title: 'Map View',
      url: '/admin/map',
      icon: Map,
      description: 'Geographic View'
    },
    {
      title: 'Settings',
      url: '/admin/settings',
      icon: Settings,
      description: 'System Settings'
    }
  ];

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} border-r border-border/50 glass-sidebar`}>
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-foreground">Admin Portal</h2>
              <p className="text-xs text-muted-foreground">Civic Management</p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">
            {collapsed ? 'Nav' : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses}
                      end={item.url === '/admin'}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}