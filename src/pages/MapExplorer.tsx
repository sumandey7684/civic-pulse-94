import React, { useEffect, useRef, useState } from 'react';
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Search, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapExplorer = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Bhubaneswar coordinates and ward data
  const bhubaneswarCenter: [number, number] = [85.8245, 20.2961];
  
  // Sample ward data for Bhubaneswar
  const wards = [
    { id: 1, name: "Ward 1 - Saheed Nagar", issues: 12, lat: 20.3019, lng: 85.8449 },
    { id: 2, name: "Ward 2 - Jayadev Vihar", issues: 8, lat: 20.2906, lng: 85.8243 },
    { id: 3, name: "Ward 3 - Khandagiri", issues: 15, lat: 20.2542, lng: 85.7785 },
    { id: 4, name: "Ward 4 - Patia", issues: 6, lat: 20.3497, lng: 85.8181 },
    { id: 5, name: "Ward 5 - Chandrasekharpur", issues: 10, lat: 20.3176, lng: 85.8048 },
    { id: 6, name: "Ward 6 - Old Town", issues: 18, lat: 20.2394, lng: 85.8336 },
    { id: 7, name: "Ward 7 - Unit-8", issues: 7, lat: 20.2625, lng: 85.8354 },
    { id: 8, name: "Ward 8 - Kalinga Nagar", issues: 9, lat: 20.2847, lng: 85.7784 }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: bhubaneswarCenter,
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add ward markers when map loads
    map.current.on('load', () => {
      wards.forEach((ward) => {
        // Create a custom marker element
        const el = document.createElement('div');
        el.className = 'ward-marker';
        el.style.cssText = `
          background: #1A73E8;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        `;
        el.textContent = ward.issues.toString();

        // Add hover effects
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
          el.style.background = '#2ECC71';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.background = '#1A73E8';
        });

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(`
          <div class="p-4 min-w-[200px]">
            <h3 class="font-bold text-lg mb-2">${ward.name}</h3>
            <p class="text-sm text-gray-600 mb-2">Active Issues: <span class="font-semibold text-red-500">${ward.issues}</span></p>
            <div class="flex gap-2 mt-3">
              <button class="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">View Issues</button>
              <button class="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Report Issue</button>
            </div>
          </div>
        `);

        // Create marker
        new mapboxgl.Marker(el)
          .setLngLat([ward.lng, ward.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Header Section */}
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
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                Bhubaneswar Ward Map
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Explore civic issues across Bhubaneswar municipality ward-wise. 
                Click on ward markers to view active issues and report new ones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {showTokenInput ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-md mx-auto glass-effect p-8 rounded-3xl text-center"
              >
                <MapPin className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Setup Map Access</h2>
                <p className="text-muted-foreground mb-6">
                  Please enter your Mapbox public token to view the interactive map.
                </p>
                <form onSubmit={handleTokenSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="pk.eyJ1Ijoi..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="btn-framer-primary w-full">
                    Initialize Map
                  </Button>
                </form>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-left">
                  <Info className="h-4 w-4 inline mr-2" />
                  Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Search and Filters */}
                <div className="glass-effect p-6 rounded-2xl">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by ward name or area..."
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">All Wards</Button>
                      <Button variant="outline" size="sm">High Issues</Button>
                      <Button variant="outline" size="sm">Low Issues</Button>
                    </div>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="glass-effect p-4 rounded-3xl">
                  <div 
                    ref={mapContainer} 
                    className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg"
                  />
                </div>

                {/* Ward Summary */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wards.map((ward, index) => (
                    <motion.div
                      key={ward.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="glass-effect p-6 rounded-2xl hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
                    >
                      <h3 className="font-bold text-lg mb-2">{ward.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Active Issues: <span className="font-semibold text-destructive">{ward.issues}</span>
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapExplorer;