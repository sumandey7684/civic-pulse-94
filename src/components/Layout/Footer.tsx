import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-civic shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">CivicReport</h3>
                <p className="text-sm text-primary font-medium">SIH 2025 Innovation</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              Empowering citizens and government to collaborate for better communities through innovative technology solutions.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground tracking-tight">Platform</h4>
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </div>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Report Issue</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Track Issues</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Map Explorer</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Community</span></a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground tracking-tight">Support & Resources</h4>
              <div className="w-8 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
            </div>
            <ul className="space-y-3">
              <li><a href="tel:+917735248493" className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Help Center</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">API Documentation</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Admin Portal</span></a></li>
              <li><a href="tel:+917735248493" className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Contact Support</span></a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground tracking-tight">Legal & Privacy</h4>
              <div className="w-8 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
            </div>
            <ul className="space-y-3">
              <li><a href="/privacy-policy" className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Data Protection</span></a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium flex items-center group"><span className="group-hover:translate-x-1 transition-transform duration-200">Accessibility</span></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 CivicReport. Built for Smart India Hackathon 2025. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};