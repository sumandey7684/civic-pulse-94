import React, { useState, useRef } from "react";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// Removed Leaflet imports for Google Maps integration
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, Camera, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [visionLoading, setVisionLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "medium",
  });
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const mapRef = useRef(null);

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = "AIzaSyDcNoYhpNi1jR5YUIetR2bWVwNnAKUChZk";

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Get user's location
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          setFormData((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
          }));
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude });
          }
        },
        () => {
          toast({ title: "Location Error", description: "Unable to fetch your location." });
        }
      );
    } else {
      toast({ title: "Geolocation not supported" });
    }
  };

  // Map categories to Google Vision labels
  const categoryLabels = {
    roads: ["road", "street", "highway", "asphalt", "intersection"],
    water: ["water", "pipe", "faucet", "tap", "leak"],
    electricity: ["electricity", "power", "pole", "wire", "transformer"],
    waste: ["garbage", "waste", "trash", "dump", "litter"],
    streetlights: ["street light", "lamp", "lighting", "pole"],
    drainage: ["drain", "sewer", "gutter", "pipe", "water"],
    other: [],
  };

  // File upload handler with 100MB limit and Google Vision validation
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 100 * 1024 * 1024; // 100MB

    for (const file of files) {
      if (file.size > maxSize) {
        toast({
          title: "⚠️ File too large",
          description: `${file.name} exceeds 100MB and was skipped.`,
        });
        continue;
      }
      setVisionLoading(true);
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(",")[1];
        // Call Google Vision API
        try {
          const visionRes = await axios.post(
            "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDcNoYhpNi1jR5YUIetR2bWVwNnAKUChZk",
            {
              requests: [
                {
                  image: { content: base64data },
                  features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
                },
              ],
            }
          );
          const labels = visionRes.data.responses[0]?.labelAnnotations?.map((l: any) => l.description.toLowerCase()) || [];
          const validLabels = categoryLabels[formData.category] || [];
          const isValid = validLabels.length === 0 || labels.some(label => validLabels.some(vl => label.includes(vl)));
          if (isValid) {
            toast({ title: "✅ Suitable for upload", description: `Photo matches category: ${formData.category}` });
            setSelectedFiles((prev) => [...prev, file]);
          } else {
            toast({ title: "❌ Invalid photo", description: `Photo does not match category: ${formData.category}` });
          }
        } catch (err) {
          toast({ title: "Vision API Error", description: "Could not validate image." });
        }
        setVisionLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag & Drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const maxSize = 100 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast({
          title: "⚠️ File too large",
          description: `${file.name} exceeds 100MB and was skipped.`,
        });
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "✅ Issue submitted successfully!",
        description:
          "Your civic issue has been reported and will be reviewed by authorities.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "medium",
      });
      setSelectedFiles([]);
    }, 2000);
  };

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
                onClick={() => navigate("/")}
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
                Report Civic Issue
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Help improve your community by reporting civic issues. Your
                reports help authorities prioritize and resolve problems faster.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)]">
                <CardHeader>
                  <CardTitle className="text-2xl">Issue Details</CardTitle>
                  <CardDescription>
                    Please provide detailed information about the civic issue
                    you're reporting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Issue Title & Category */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Issue Title
                        </label>
                        <Input
                          placeholder="Brief description of the issue"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="roads">
                              Roads & Infrastructure
                            </SelectItem>
                            <SelectItem value="water">Water Supply</SelectItem>
                            <SelectItem value="electricity">
                              Electricity
                            </SelectItem>
                            <SelectItem value="waste">
                              Waste Management
                            </SelectItem>
                            <SelectItem value="streetlights">
                              Street Lights
                            </SelectItem>
                            <SelectItem value="drainage">Drainage</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <div className="relative mb-2 flex gap-2 items-center">
                        <Input
                          placeholder="Enter location or address"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={handleLocateMe}
                          title="Use my location"
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant={manualMode ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                          onClick={() => setManualMode((prev) => !prev)}
                        >
                          {manualMode ? "Manual Mode On" : "Manual Location"}
                        </Button>
                      </div>
                      {/* Google Maps Integration */}
                      <div className="h-[300px] w-full rounded overflow-hidden border">
                        {isLoaded && (
                          <GoogleMap
                            center={markerPosition || { lat: 20.5937, lng: 78.9629 }}
                            zoom={markerPosition ? 15 : 5}
                            mapContainerStyle={{ height: "100%", width: "100%" }}
                            onLoad={map => { mapRef.current = map; }}
                            onClick={manualMode ? (e => {
                              const lat = e.latLng.lat();
                              const lng = e.latLng.lng();
                              setMarkerPosition({ lat, lng });
                              setFormData((prev) => ({ ...prev, location: `${lat}, ${lng}` }));
                            }) : undefined}
                          >
                            {markerPosition && (
                              <Marker
                                position={markerPosition}
                                draggable={manualMode}
                                onDragEnd={e => {
                                  const lat = e.latLng.lat();
                                  const lng = e.latLng.lng();
                                  setMarkerPosition({ lat, lng });
                                  setFormData((prev) => ({
                                    ...prev,
                                    location: `${lat}, ${lng}`,
                                  }));
                                }}
                              />
                            )}
                          </GoogleMap>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Use the location pin to auto-fill, or enable manual mode to drag/select location on the map.</p>
                    </div>

                    {/* ...existing code... */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Priority Level
                      </label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, priority: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">
                            Medium Priority
                          </SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* ...existing code... */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Please provide detailed description of the issue"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
                        required
                      />
                    </div>

                    {/* ...existing code... */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium">
                        Upload Photos/Videos
                      </label>

                      {/* Drag & Drop / Click Upload */}
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-sm font-medium mb-2">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, MP4 up to 100MB each
                          </p>
                        </label>
                      </div>

                      {/* Mobile Camera Button */}
                      <div className="flex justify-center">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          capture="environment"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="camera-upload"
                        />
                        <label
                          htmlFor="camera-upload"
                          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                        >
                          <Camera className="h-5 w-5" />
                          Take Photo / Video
                        </label>
                      </div>

                      {/* Selected Files Preview */}
                      {selectedFiles.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <p className="text-sm font-medium">Selected files:</p>
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-3 text-sm bg-muted p-2 rounded"
                            >
                              <div className="flex items-center gap-2">
                                {file.type.startsWith("image/") ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="h-10 w-10 object-cover rounded"
                                  />
                                ) : (
                                  <video
                                    src={URL.createObjectURL(file)}
                                    className="h-10 w-10 rounded"
                                    muted
                                  />
                                )}
                                <span className="truncate max-w-[180px]">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedFiles((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  )
                                }
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ...existing code... */}
                    <Button
                      type="submit"
                      className="btn-framer-primary w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Issue Report"
                      )}
                    </Button>
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

// Removed unused Leaflet helper component
};

export default ReportIssue;
