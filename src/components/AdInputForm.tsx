import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Link, Type } from "lucide-react";

interface AdInputFormProps {
  adCopy: string;
  setAdCopy: (copy: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  cta: string;
  setCta: (cta: string) => void;
}

const CTA_OPTIONS = [
  "Shop Now",
  "Learn More", 
  "Sign Up",
  "Book Now",
  "Contact Us",
  "Get Offer",
  "Download",
  "Subscribe",
  "Watch More",
  "Apply Now",
  "Get Quote",
  "Send Message",
  "Send WhatsApp Message",
  "Call Now",
  "Use App",
  "Play Game",
  "Listen Now",
  "Request Time"
];

export const AdInputForm = ({
  adCopy,
  setAdCopy,
  imageFile,
  setImageFile,
  imageUrl,
  setImageUrl,
  videoUrl,
  setVideoUrl,
  cta,
  setCta
}: AdInputFormProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5 text-primary" />
          Ad Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ad Copy */}
        <div className="space-y-2">
          <Label htmlFor="ad-copy">Ad Copy</Label>
          <Textarea
            id="ad-copy"
            placeholder="Write compelling ad copy that resonates with your audience..."
            value={adCopy}
            onChange={(e) => setAdCopy(e.target.value)}
            className="min-h-[100px] transition-smooth focus:shadow-glow"
            rows={4}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="image-upload">Image Upload</Label>
          <div className="flex items-center gap-4">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="transition-smooth focus:shadow-glow"
            />
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          {imageFile && (
            <p className="text-sm text-success">✓ {imageFile.name} uploaded</p>
          )}
        </div>

        {/* Video URL */}
        <div className="space-y-2">
          <Label htmlFor="video-url">Video URL (YouTube)</Label>
          <div className="flex items-center gap-4">
            <Input
              id="video-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="transition-smooth focus:shadow-glow"
            />
            <Link className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* CTA Selection */}
        <div className="space-y-2">
          <Label htmlFor="cta-select">Call to Action</Label>
          <Select value={cta} onValueChange={setCta}>
            <SelectTrigger className="transition-smooth focus:shadow-glow">
              <SelectValue placeholder="Select a call to action" />
            </SelectTrigger>
            <SelectContent className="bg-popover border shadow-lg">
              {CTA_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};