import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AdPreviewProps {
  adCopy: string;
  imageUrl?: string;
  videoUrl?: string;
  cta: string;
}

export const AdPreview = ({ adCopy, imageUrl, videoUrl, cta }: AdPreviewProps) => {
  const renderMedia = () => {
    if (videoUrl) {
      const videoId = videoUrl.includes('youtube.com') 
        ? videoUrl.split('v=')[1]?.split('&')[0]
        : videoUrl.includes('youtu.be')
        ? videoUrl.split('/').pop()
        : null;

      if (videoId) {
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Ad Video"
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        );
      }
    }

    if (imageUrl) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={imageUrl}
            alt="Ad Visual"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = 
                '<div class="flex h-full items-center justify-center text-muted-foreground">Image failed to load</div>';
            }}
          />
        </div>
      );
    }

    return (
      <div className="aspect-video w-full rounded-lg bg-gradient-secondary flex items-center justify-center">
        <span className="text-muted-foreground">Upload an image or add a video URL</span>
      </div>
    );
  };

  return (
    <Card className="p-6 shadow-soft transition-slow hover:shadow-glow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full gradient-primary"></div>
          <div>
            <p className="font-semibold">Your Brand</p>
            <p className="text-sm text-muted-foreground">Sponsored</p>
          </div>
        </div>

        {/* Media */}
        {renderMedia()}

        {/* Ad Copy */}
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            {adCopy || "Enter your ad copy to see how it will appear..."}
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full gradient-primary text-primary-foreground hover:shadow-glow transition-slow font-semibold"
          size="lg"
        >
          {cta || "Select a call to action"}
        </Button>

        {/* Engagement indicators */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
          <span>👍 Like</span>
          <span>💬 Comment</span>
          <span>↗️ Share</span>
        </div>
      </div>
    </Card>
  );
};