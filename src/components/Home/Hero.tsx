import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Users, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary-soft to-secondary-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                🏛️ SIH 2025 Government Innovation
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Empowering Citizens,
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}Building Communities
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Report civic issues instantly, track their resolution in real-time, and collaborate with your community to build a better tomorrow.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">1,247</p>
                  <p className="text-sm text-muted-foreground">Issues Resolved</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">25,000+</p>
                  <p className="text-sm text-muted-foreground">Active Citizens</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-civic-primary text-lg px-8 py-6">
                <Camera className="mr-2 h-5 w-5" />
                Report an Issue
              </Button>
              
              <Button variant="outline" className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Map
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-success/20 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Government Verified</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Real-time Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="card-civic p-8 bg-card/80 backdrop-blur">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">How It Works</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Take a Photo</h4>
                      <p className="text-sm text-muted-foreground">Capture the issue with your phone camera</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Add Location</h4>
                      <p className="text-sm text-muted-foreground">Auto-detect or pin exact location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">Get real-time updates on resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};