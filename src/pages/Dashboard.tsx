import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  FileText,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Citizen Dashboard Component
 * Protected route showing user's civic report dashboard
 * Displays user reports, community stats, and quick actions
 */
const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out: ' + error.message);
    } else {
      toast.success('Successfully signed out');
      navigate('/');
    }
  };

  // Mock data for demonstration
  const userReports = [
    {
      id: 1,
      title: 'Broken Street Light',
      location: 'Main Street & 2nd Ave',
      status: 'resolved',
      date: '2024-01-15',
      category: 'Infrastructure'
    },
    {
      id: 2,
      title: 'Pothole on Highway',
      location: 'Highway 101 near Mall',
      status: 'in_progress',
      date: '2024-01-20',
      category: 'Roads'
    },
    {
      id: 3,
      title: 'Illegal Dumping',
      location: 'Park Avenue',
      status: 'submitted',
      date: '2024-01-22',
      category: 'Environment'
    }
  ];

  const communityStats = [
    { label: 'Total Reports', value: '1,247', icon: FileText, trend: '+12%' },
    { label: 'Resolved Issues', value: '892', icon: CheckCircle, trend: '+8%' },
    { label: 'Active Citizens', value: '543', icon: Users, trend: '+15%' },
    { label: 'Response Time', value: '2.3 days', icon: Clock, trend: '-0.5d' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="status-resolved">Resolved</Badge>;
      case 'in_progress':
        return <Badge className="status-progress">In Progress</Badge>;
      case 'submitted':
        return <Badge className="status-submitted">Submitted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                  Welcome Back!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Hello {user?.email}, manage your civic reports and track community issues
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="btn-framer-ghost"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Community Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="floating-card text-center">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <stat.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {stat.label}
                        </div>
                        <div className="flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-success mr-1" />
                          <span className="text-sm text-success">{stat.trend}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Button
                  onClick={() => navigate('/report')}
                  className="btn-framer-primary h-20 text-lg"
                >
                  <FileText className="mr-3 h-6 w-6" />
                  Report New Issue
                </Button>
                <Button
                  onClick={() => navigate('/map')}
                  className="btn-framer-secondary h-20 text-lg"
                >
                  <MapPin className="mr-3 h-6 w-6" />
                  Explore Map
                </Button>
                <Button
                  variant="outline"
                  className="btn-framer-ghost h-20 text-lg"
                >
                  <AlertCircle className="mr-3 h-6 w-6" />
                  Emergency Report
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* User Reports */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Your Reports
              </h2>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {userReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="hover-lift">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{report.title}</CardTitle>
                            <CardDescription className="flex items-center mt-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {report.location}
                            </CardDescription>
                          </div>
                          {getStatusBadge(report.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {report.date}
                          </span>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;