import { useState, useRef } from "react";
import { Shield, Github, Twitter, Linkedin, Mail, Facebook, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  
  // Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [0, 1000], [-20, 20]);
  const parallaxY = useTransform(mouseY, [0, 1000], [-20, 20]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  // Animation variants with proper typing
  const footerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 25
      }
    }
  };

  const linkVariants = {
    rest: { x: 0, color: "hsl(var(--muted-foreground))" },
    hover: {
      x: 8,
      color: "hsl(var(--primary))",
      textShadow: "0 0 8px hsl(var(--primary)/0.6)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 17
      }
    }
  };

  const socialIconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 0],
      y: -4,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
        rotate: {
          duration: 0.6,
          ease: "easeInOut" as const
        }
      }
    }
  };

  return (
    <motion.footer
      ref={footerRef}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      className="relative bg-gradient-to-br from-background via-muted/20 to-background border-t border-border overflow-hidden"
    >
      {/* Animated floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/3"
        />
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full blur-sm"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>

      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-5 md:grid-cols-3 gap-12"
          variants={itemVariants}
        >
          {/* Brand & Newsletter - Takes 2 columns */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={itemVariants}
          >
            <motion.div 
              className="space-y-6 p-6 rounded-2xl glass-effect hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl gradient-civic shadow-lg"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 0 20px hsl(var(--primary)/0.6)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Shield className="h-7 w-7 text-white" />
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-foreground"
                    whileHover={{ 
                      textShadow: "0 0 8px hsl(var(--primary)/0.6)"
                    }}
                  >
                    CivicReport
                  </motion.h3>
                  <p className="text-sm text-primary font-medium">SIH 2025 Innovation</p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Empowering citizens and government to collaborate for better communities through innovative technology solutions.
              </p>
            </motion.div>

            {/* Newsletter Subscription with premium effects */}
            <motion.div 
              className="space-y-4 p-6 rounded-2xl glass-effect hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <div>
                <motion.h4 
                  className="text-lg font-semibold text-foreground mb-2"
                  whileHover={{ 
                    textShadow: "0 0 8px hsl(var(--primary)/0.6)"
                  }}
                >
                  Stay Updated
                </motion.h4>
                <p className="text-sm text-muted-foreground">Get the latest updates on civic improvements and community initiatives.</p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <motion.div 
                    className="flex-1 relative"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass-effect border-border/50 focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 bg-background/80 backdrop-blur-sm"
                      required
                      onFocus={() => setIsHovered(true)}
                      onBlur={() => setIsHovered(false)}
                    />
                    <motion.div
                      className="absolute inset-0 pointer-events-none text-muted-foreground/60 flex items-center px-3"
                      initial={{ opacity: email ? 0 : 1 }}
                      animate={{ opacity: email || isHovered ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        animate={{ 
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        ✨ Enter your email...
                      </motion.span>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      size="sm"
                      className="btn-civic-primary relative overflow-hidden group"
                      disabled={isSubscribed}
                    >
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full scale-0"
                        whileHover={{ scale: 4 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {isSubscribed ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="flex items-center gap-1 relative z-10"
                        >
                          <Shield className="h-4 w-4" />
                          <span className="hidden sm:inline">Subscribed!</span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-1 relative z-10">
                          <motion.div
                            animate={{ x: [0, 2, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </motion.div>
                          <span className="hidden sm:inline">Subscribe</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </motion.div>

          {/* Quick Navigation with premium hover effects */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <motion.h4 
                className="text-lg font-bold text-foreground tracking-tight"
                whileHover={{ 
                  textShadow: "0 0 8px hsl(var(--primary)/0.6)"
                }}
              >
                Quick Navigation
              </motion.h4>
              <motion.div 
                className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"
                whileHover={{ width: "3rem" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/report", label: "Report Issue" },
                { href: "/map", label: "Map Explorer" },
                { href: "/contact", label: "Contact" }
              ].map((link, index) => (
                <motion.li key={link.href}>
                  <motion.a 
                    href={link.href}
                    className="text-muted-foreground font-medium flex items-center group relative overflow-hidden rounded-lg px-3 py-2 -mx-3"
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {/* Glow effect background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    >
                      <ArrowRight className="h-3 w-3 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </motion.div>
                    
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Underline effect */}
                    <motion.div
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-transparent scale-x-0 origin-left"
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support with enhanced effects */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <motion.h4 
                className="text-lg font-bold text-foreground tracking-tight"
                whileHover={{ 
                  textShadow: "0 0 8px hsl(var(--secondary)/0.6)"
                }}
              >
                Support & Resources
              </motion.h4>
              <motion.div 
                className="w-8 h-0.5 bg-gradient-to-r from-secondary to-transparent"
                whileHover={{ width: "3rem" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <ul className="space-y-4">
              {[
                { href: "tel:+917735248493", label: "Help Center" },
                { href: "#", label: "API Documentation" },
                { href: "#", label: "Admin Portal" },
                { href: "tel:+917735248493", label: "Contact Support" }
              ].map((link, index) => (
                <motion.li key={index}>
                  <motion.a 
                    href={link.href}
                    className="text-muted-foreground hover:text-secondary font-medium flex items-center group relative overflow-hidden rounded-lg px-3 py-2 -mx-3"
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    <ArrowRight className="h-3 w-3 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative z-10">{link.label}</span>
                    
                    <motion.div
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-secondary to-transparent scale-x-0 origin-left"
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal with enhanced effects */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <motion.h4 
                className="text-lg font-bold text-foreground tracking-tight"
                whileHover={{ 
                  textShadow: "0 0 8px hsl(var(--accent)/0.6)"
                }}
              >
                Legal & Privacy
              </motion.h4>
              <motion.div 
                className="w-8 h-0.5 bg-gradient-to-r from-accent to-transparent"
                whileHover={{ width: "3rem" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <ul className="space-y-4">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "#", label: "Terms of Service" },
                { href: "#", label: "Data Protection" },
                { href: "#", label: "Accessibility" }
              ].map((link, index) => (
                <motion.li key={index}>
                  <motion.a 
                    href={link.href}
                    className="text-muted-foreground hover:text-accent font-medium flex items-center group relative overflow-hidden rounded-lg px-3 py-2 -mx-3"
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    <ArrowRight className="h-3 w-3 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative z-10">{link.label}</span>
                    
                    <motion.div
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 origin-left"
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section with premium social icons */}
        <motion.div 
          className="border-t border-border/50 mt-16 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <motion.div 
              className="text-center lg:text-left"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-muted-foreground">
                © 2025 CivicReport. Built for Smart India Hackathon 2025. All rights reserved.
              </p>
              <motion.p 
                className="text-xs text-muted-foreground/70 mt-1"
                animate={{ 
                  textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Developed with ❤️ for better governance
              </motion.p>
            </motion.div>
            
            {/* Premium Social Media Links */}
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground mr-4 hidden sm:block">Follow us:</p>
              <div className="flex items-center space-x-1">
                {[
                  { Icon: Facebook, color: "blue", href: "#" },
                  { Icon: Twitter, color: "sky", href: "#" },
                  { Icon: Linkedin, color: "blue", href: "#" },
                  { Icon: Github, color: "slate", href: "#" },
                  { Icon: Mail, color: "red", href: "#" }
                ].map(({ Icon, color, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary relative overflow-hidden group"
                    variants={socialIconVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300"
                      whileHover={{ 
                        boxShadow: "0 0 20px hsl(var(--primary)/0.6)"
                      }}
                    />
                    
                    <motion.div
                      animate={{ 
                        rotate: [0, 360] 
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="relative z-10"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    
                    {/* Particle effect on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      whileHover={{
                        background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};