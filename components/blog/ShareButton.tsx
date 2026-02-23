"use client";

import { Share2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface ShareButtonProps {
  title: string;
  slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Failed to share.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link.");
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="gap-2 rounded-full h-8 px-3 text-xs"
    >
      <Share2Icon className="h-3.5 w-3.5" />
      <span>Share</span>
    </Button>
  );
}
