import React, { useState, useEffect } from 'react';
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

/**
 * Signup Component with Supabase Authentication
 * Supports role-based registration for citizens and admins
 * Includes proper error handling and email confirmation flow
 */
const Signup = () => {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'citizen' | 'admin' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleRoleSelect = (role: 'citizen' | 'admin') => {
    setSelectedRole(role);
  };

  // Validate password strength
  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  // Handle form submission with Supabase authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password);
      
      if (error) {
        // Handle specific error types
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Try signing in instead.');
        } else if (error.message.includes('Invalid email')) {
          toast.error('Please enter a valid email address.');
        } else if (error.message.includes('Password should be at least 6 characters')) {
          toast.error('Password must be at least 6 characters long.');
        } else {
          toast.error(error.message || 'An error occurred during sign up');
        }
      } else {
        setEmailSent(true);
        toast.success('Account created! Please check your email to confirm your account.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show email confirmation message after successful signup
  if (emailSent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-12">
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] text-center">
                  <CardHeader className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Check Your Email</CardTitle>
                    <CardDescription>
                      We've sent you a confirmation link at <strong>{formData.email}</strong>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Click the link in your email to verify your account and complete the registration process.
                    </p>
                    <div className="space-y-4">
                      <Button
                        onClick={() => navigate('/login')}
                        className="btn-framer-primary w-full"
                      >
                        Go to Sign In
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEmailSent(false)}
                        className="btn-framer-ghost w-full"
                      >
                        Try Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-12">
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="btn-framer-ghost"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                  Join CivicReport
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Choose your role to get started with our civic engagement platform
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => handleRoleSelect('citizen')}
                  className="cursor-pointer"
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 h-full">
                    <CardHeader className="text-center space-y-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Citizen Account</CardTitle>
                      <CardDescription className="text-base">
                        Join as a citizen to report issues and engage with your community
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Report civic issues with photos and location</li>
                        <li>• Track status of your reports</li>
                        <li>• View community issues on interactive map</li>
                        <li>• Receive notifications on issue resolution</li>
                      </ul>
                      <Button className="btn-framer-primary w-full mt-6">
                        Sign Up as Citizen
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => handleRoleSelect('admin')}
                  className="cursor-pointer"
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 h-full">
                    <CardHeader className="text-center space-y-4">
                      <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="h-10 w-10 text-secondary" />
                      </div>
                      <CardTitle className="text-2xl">Admin Account</CardTitle>
                      <CardDescription className="text-base">
                        Register as an administrator to manage civic operations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• View and manage all reported issues</li>
                        <li>• Assign issues to relevant departments</li>
                        <li>• Track resolution progress and analytics</li>
                        <li>• Generate reports and insights</li>
                      </ul>
                      <Button className="btn-framer-secondary w-full mt-6">
                        Sign Up as Admin
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Signup form
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <Button
                variant="outline"
                onClick={() => setSelectedRole(null)}
                className="btn-framer-ghost"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Role
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                Create {selectedRole === 'citizen' ? 'Citizen' : 'Admin'} Account
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join CivicReport to make a difference in your community
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)]">
                <CardHeader className="text-center space-y-4">
                  <div className={`w-16 h-16 ${selectedRole === 'citizen' ? 'bg-primary/10' : 'bg-secondary/10'} rounded-full flex items-center justify-center mx-auto`}>
                    {selectedRole === 'citizen' ? (
                      <Users className="h-8 w-8 text-primary" />
                    ) : (
                      <Shield className="h-8 w-8 text-secondary" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">Welcome to CivicReport</CardTitle>
                  <CardDescription>
                    Create your {selectedRole} account to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password (min 6 characters)"
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 h-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 h-6"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className={selectedRole === 'citizen' ? 'btn-framer-primary' : 'btn-framer-secondary'}
                      size="lg"
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting || loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="text-primary hover:underline font-medium"
                          onClick={() => navigate('/login')}
                        >
                          Sign in here
                        </button>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;