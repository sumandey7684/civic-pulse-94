import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MapPin,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/Admin/AdminSidebar';
import { AdminHeader } from '@/components/Admin/AdminHeader';

/**
 * Admin Dashboard Component
 * Modern SaaS-style dashboard for civic issue management
 * Features analytics, management tools, and visual insights
 */
const AdminDashboard = () => {
  // Dummy data for demonstration
  const statsData = [
    {
      title: "Total Reports",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Solved Issues", 
      value: "1,923",
      change: "+8.2%",
      trend: "up", 
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Pending Issues",
      value: "924",
      change: "-3.1%",
      trend: "down",
      icon: Clock,
      color: "orange"
    },
    {
      title: "Active Citizens",
      value: "1,247",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "purple"
    }
  ];

  const wardData = [
    { ward: "Chandrasekharpur", issues: 124, solved: 89, pending: 35 },
    { ward: "Jaydev Vihar", issues: 98, solved: 67, pending: 31 },
    { ward: "Saheed Nagar", issues: 156, solved: 102, pending: 54 },
    { ward: "Unit-4", issues: 87, solved: 73, pending: 14 },
    { ward: "Patia", issues: 145, solved: 98, pending: 47 }
  ];

  const recentReports = [
    {
      id: 1,
      reporterName: "Priya Sharma",
      ward: "Chandrasekharpur", 
      location: "Utkal Hospital Road",
      category: "Infrastructure",
      status: "pending",
      dateReported: "2025-01-12",
      priority: "high"
    },
    {
      id: 2,
      reporterName: "Rajesh Kumar",
      ward: "Jaydev Vihar",
      location: "Square Area", 
      category: "Roads",
      status: "in_progress",
      dateReported: "2025-01-11",
      priority: "medium"
    },
    {
      id: 3,
      reporterName: "Anita Patel",
      ward: "Saheed Nagar",
      location: "Near Rama Devi University",
      category: "Sanitation", 
      status: "solved",
      dateReported: "2025-01-10",
      priority: "low"
    },
    {
      id: 4,
      reporterName: "Suresh Jena",
      ward: "Unit-4",
      location: "Market Area",
      category: "Waste Management",
      status: "pending",
      dateReported: "2025-01-09",
      priority: "high"
    },
    {
      id: 5,
      reporterName: "Meera Das",
      ward: "Patia", 
      location: "Big Bazaar Road",
      category: "Drainage",
      status: "in_progress",
      dateReported: "2025-01-08",
      priority: "medium"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'solved':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Solved</Badge>;
      case 'in_progress':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-xs">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{priority}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage civic issues and monitor community engagement
                </p>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="glass-card hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            {stat.value}
                          </p>
                          <div className="flex items-center mt-2">
                            {stat.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-success mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                            )}
                            <span className={`text-sm ${
                              stat.trend === 'up' ? 'text-success' : 'text-destructive'
                            }`}>
                              {stat.change}
                            </span>
                            <span className="text-sm text-muted-foreground ml-1">
                              vs last month
                            </span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                          <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ward-wise Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Ward-wise Issue Breakdown
                    </CardTitle>
                    <CardDescription>
                      Issue distribution across different wards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {wardData.map((ward, index) => (
                        <motion.div
                          key={ward.ward}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                        >
                          <div>
                            <p className="font-medium text-foreground">{ward.ward}</p>
                            <p className="text-sm text-muted-foreground">
                              {ward.issues} total issues
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-success/10 text-success">
                              {ward.solved} solved
                            </Badge>
                            <Badge className="bg-warning/10 text-warning">
                              {ward.pending} pending
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Issue Distribution Map
                    </CardTitle>
                    <CardDescription>
                      Geographic overview of reported issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Interactive map will be integrated here
                        </p>
                        <Button variant="outline" className="mt-4">
                          View Full Map
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Reports Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Recent Reports
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Latest citizen reports requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-7 gap-4 p-3 bg-muted/20 rounded-lg text-sm font-medium text-muted-foreground mb-4">
                        <div>Reporter</div>
                        <div>Ward</div>
                        <div>Location</div>
                        <div>Category</div>
                        <div>Status</div>
                        <div>Priority</div>
                        <div>Date</div>
                      </div>
                      <div className="space-y-2">
                        {recentReports.map((report, index) => (
                          <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className="grid grid-cols-7 gap-4 p-3 hover:bg-muted/20 rounded-lg transition-colors"
                          >
                            <div className="font-medium text-foreground">
                              {report.reporterName}
                            </div>
                            <div className="text-muted-foreground">
                              {report.ward}
                            </div>
                            <div className="text-muted-foreground">
                              {report.location}
                            </div>
                            <div>
                              <Badge variant="outline" className="text-xs">
                                {report.category}
                              </Badge>
                            </div>
                            <div>
                              {getStatusBadge(report.status)}
                            </div>
                            <div>
                              {getPriorityBadge(report.priority)}
                            </div>
                            <div className="text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {report.dateReported}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;