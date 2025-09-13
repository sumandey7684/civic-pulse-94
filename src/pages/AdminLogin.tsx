import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Shield, Lock, Building2, Eye, EyeOff, Loader2, CheckCircle, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

/**
 * Admin Login Component
 * Specialized admin portal login with enhanced security UI
 * Features welcome popup and different styling from citizen login
 */
const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Show welcome popup and redirect after successful admin login
  useEffect(() => {
    if (user && !loading) {
      setShowWelcomePopup(true);
      // Auto redirect to admin dashboard after popup
      const timer = setTimeout(() => {
        navigate('/admin');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate]);

  // Handle form submission with admin-specific authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic admin email validation (you can enhance this)
    if (!formData.email.includes('admin') && !formData.email.includes('@gov.')) {
      toast.error('Please use a valid admin email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        // Handle specific error types for admin login
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid admin credentials. Access denied.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Admin account not verified. Contact system administrator.');
        } else if (error.message.includes('Too many requests')) {
          toast.error('Security lockout activated. Please wait before retrying.');
        } else {
          toast.error(error.message || 'Admin authentication failed');
        }
      } else {
        toast.success('Admin authentication successful!');
        // Welcome popup will show via useEffect
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('System error. Contact technical support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Welcome popup after successful login
  const WelcomePopup = () => (
    <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary via-secondary-hover to-accent rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Hello Admin!
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Welcome back to the admin portal. You have successfully authenticated.
          </DialogDescription>
        </DialogHeader>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-success font-medium">Authentication Verified</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Redirecting to your admin dashboard...
          </p>
          <Button 
            onClick={() => {
              setShowWelcomePopup(false);
              navigate('/admin');
            }}
            className="btn-framer-secondary w-full"
          >
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-accent/5">
        {/* Admin Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-secondary/10 text-secondary border border-secondary/20"
              >
                <Shield className="mr-1 h-3 w-3" />
                Admin Portal
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg"
          >
            {/* Admin Login Card */}
            <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] bg-background/80 backdrop-blur-lg">
              <CardHeader className="text-center space-y-6 pb-8">
                {/* Admin Logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative mx-auto"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary via-secondary-hover to-accent rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    Admin Access Portal
                  </CardTitle>
                  <CardDescription className="text-base">
                    Secure authentication for administrative personnel
                  </CardDescription>
                </div>

                {/* Security Features */}
                <div className="flex justify-center space-x-4">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="mr-1 h-3 w-3" />
                    Encrypted
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Lock className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Admin Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="admin@civicreport.gov"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 bg-background/50 border-secondary/20 focus:border-secondary"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Use your official government or admin email
                    </p>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Secure Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your secure password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="h-12 bg-background/50 border-secondary/20 focus:border-secondary pr-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 hover:bg-secondary/10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="btn-framer-secondary h-12 text-base font-semibold w-full"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-5 w-5" />
                        Access Admin Portal
                      </>
                    )}
                  </Button>
                </form>

                {/* Footer Links */}
                <div className="text-center space-y-3 pt-4 border-t border-border/50">
                  <button
                    type="button"
                    className="text-sm text-secondary hover:text-secondary-hover hover:underline font-medium"
                  >
                    Forgot admin credentials?
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Need admin access? Contact your system administrator
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-muted-foreground">
                This is a secure government portal. All activities are logged and monitored.
              </p>
            </motion.div>
          </motion.div>
        </main>
      </div>

      {/* Welcome Popup */}
      <WelcomePopup />
    </>
  );
};

export default AdminLogin;