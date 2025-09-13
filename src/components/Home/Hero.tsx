import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Camera, MapPin, Users, Shield, CheckCircle, BarChart3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const Hero = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReportIssue = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file selection - you can add more logic here
      console.log('Selected files:', files);
      // For now, just show an alert
      alert(`Selected ${files.length} file(s) for issue reporting!`);
    }
  };

  const handleExploreMap = () => {
    navigate('/map');
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
              className="text-center lg:text-left"
            >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            >
              <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-3 mb-8 text-sm font-semibold
                               backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:scale-105 transition-transform">
                <Sparkles className="mr-2 h-4 w-4" />
                SIH 2025 Government Innovation
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-[0.9]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Empowering Citizens,
              <span className="gradient-hero bg-clip-text text-transparent block text-2xl sm:text-4xl lg:text-5xl xl:text-6xl">
                Building Communities
              </span>
            </motion.h1>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="btn-framer-primary text-lg px-10 py-7"
                  onClick={handleReportIssue}
                >
                  <Camera className="mr-3 h-6 w-6" />
                  Report an Issue
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="btn-framer-ghost text-lg px-10 py-7"
                  onClick={handleExploreMap}
                >
                  <MapPin className="mr-3 h-6 w-6" />
                  Explore Map
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual Explanation - Simplified */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-effect rounded-3xl p-10 shadow-[var(--shadow-elevated)]">
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">How It Works</h3>
              <div className="space-y-6">
                {[
                  { icon: Camera, title: "Take a Photo", color: "primary" },
                  { icon: CheckCircle, title: "Track Progress", color: "success" }
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  >
                    <div className={`h-16 w-16 rounded-2xl bg-${step.color}/20 flex items-center justify-center`}>
                      <step.icon className={`h-8 w-8 text-${step.color}`} />
                    </div>
                    <h4 className="font-bold text-foreground text-lg">{step.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Hidden file input for drag and drop functionality */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />
      
      <FloatingActionButton className="lg:hidden" />
    </section>
    </>
  );
};
