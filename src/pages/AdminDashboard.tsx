import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Settings,
  FileText,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Archive
} from "lucide-react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const AdminDashboard = () => {
  // Mock data for admin dashboard
  const stats = [
    {
      title: "Total Issues",
      value: "1,247",
      change: "+12%",
      icon: AlertCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Users",
      value: "842",
      change: "+8%",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Resolved Today",
      value: "34",
      change: "+23%",
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Pending Issues",
      value: "156",
      change: "-5%",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ];

  const recentIssues = [
    {
      id: "ISS-1001",
      title: "Pothole on Main Street",
      location: "Ward 5, Main Street",
      priority: "High",
      status: "In Progress",
      assignee: "Road Dept.",
      reportedBy: "John Doe",
      timeAgo: "2 hours ago"
    },
    {
      id: "ISS-1002", 
      title: "Broken Street Light",
      location: "Ward 2, Park Avenue",
      priority: "Medium",
      status: "Pending", 
      assignee: "Electrical Dept.",
      reportedBy: "Jane Smith",
      timeAgo: "4 hours ago"
    },
    {
      id: "ISS-1003",
      title: "Garbage Collection Missed",
      location: "Ward 1, Oak Street",
      priority: "Low",
      status: "Resolved",
      assignee: "Sanitation Dept.",
      reportedBy: "Mike Johnson",
      timeAgo: "1 day ago"
    },
    {
      id: "ISS-1004",
      title: "Water Supply Disruption",
      location: "Ward 3, Elm Street",
      priority: "Critical",
      status: "In Progress",
      assignee: "Water Dept.",
      reportedBy: "Sarah Wilson",
      timeAgo: "30 minutes ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage civic issues, oversee operations, and track performance metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Issues Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">
                    Recent Issues
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue, index) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-sm text-muted-foreground">
                              {issue.id}
                            </span>
                            <Badge className={getPriorityColor(issue.priority)}>
                              {issue.priority}
                            </Badge>
                            <Badge className={getStatusColor(issue.status)}>
                              {issue.status}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {issue.title}
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {issue.location}
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Assigned to: {issue.assignee}</span>
                            <span>Reported by: {issue.reportedBy}</span>
                            <span>{issue.timeAgo}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 ml-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">
                    View All Issues
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Create New Issue
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Map
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Archive className="w-4 h-4 mr-2" />
                  Archived Issues
                </Button>
              </CardContent>
            </Card>

            {/* Department Overview */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Department Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Road Department</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Water Department</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sanitation</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Electrical</span>
                  <Badge className="bg-red-100 text-red-800">Offline</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Issue #1001 updated</p>
                  <p className="text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">New user registered</p>
                  <p className="text-muted-foreground">15 minutes ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Issue #998 resolved</p>
                  <p className="text-muted-foreground">1 hour ago</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;