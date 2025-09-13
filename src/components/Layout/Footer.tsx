import { useState } from "react";
import {
  Shield,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Facebook,
  Send,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-background via-muted/20 to-background border-t border-border overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12">
          {/* Brand & Newsletter - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-civic shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Shield className="h-7 w-7 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    CivicReport
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    SIH 2025 Innovation
                  </p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Empowering citizens and government to collaborate for better
                communities through innovative technology solutions.
              </p>
            </motion.div>

            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Stay Updated
                </h4>
                <p className="text-sm text-muted-foreground">
                  Get the latest updates on civic improvements and community
                  initiatives.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 glass-effect border-border/50 focus:border-primary transition-all duration-300"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="btn-civic-primary hover:shadow-lg transition-all duration-300 group"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1"
                      >
                        <Shield className="h-4 w-4" />
                        <span className="hidden sm:inline">Subscribed!</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        <span className="hidden sm:inline">Subscribe</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground tracking-tight">
                Quick Navigation
              </h4>
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>About</span>
                </a>
              </li>
              <li>
                <a
                  href="/report"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Report Issue</span>
                </a>
              </li>
              <li>
                <a
                  href="/map"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Map Explorer</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground tracking-tight">
                Support & Resources
              </h4>
              <div className="w-8 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+917735248493"
                  className="text-muted-foreground hover:text-secondary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>API Documentation</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-secondary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Admin Portal</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917735248493"
                  className="text-muted-foreground hover:text-secondary transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground tracking-tight">
                Legal & Privacy
              </h4>
              <div className="w-8 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Data Protection</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm font-medium flex items-center group hover:pl-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span>Accessibility</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border/50 mt-16 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                © 2025 CivicReport. Built for Smart India Hackathon 2025. All
                rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Developed by Team Technoplies with ❤️ for better governance
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground mr-4 hidden sm:block">
                Follow us:
              </p>
              <div className="flex items-center space-x-1">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-300 group"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 group"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-blue-600 hover:bg-blue-600/10 transition-all duration-300 group"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-gray-700 hover:bg-gray-700/10 transition-all duration-300 group"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
