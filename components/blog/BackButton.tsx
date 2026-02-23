"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back to blogs
    </button>
  );
}
