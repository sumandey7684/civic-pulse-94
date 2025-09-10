import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-6">
            🚀 Ready to Get Started?
          </Badge>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Join Thousands of Citizens
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Making a Difference
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Start reporting issues, tracking progress, and building stronger communities today. 
            Your voice matters in creating positive change.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button className="btn-civic-primary text-lg px-8 py-6">
              <Camera className="mr-2 h-5 w-5" />
              Report Your First Issue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5">
              <Users className="mr-2 h-5 w-5" />
              Join Community
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Government Verified</h3>
              <p className="text-sm text-muted-foreground text-center">
                Official platform certified by government digital standards
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Community Driven</h3>
              <p className="text-sm text-muted-foreground text-center">
                Built by citizens, for citizens with transparent processes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Camera className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Mobile First</h3>
              <p className="text-sm text-muted-foreground text-center">
                Optimized for smartphones with offline capabilities
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};