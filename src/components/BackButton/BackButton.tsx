"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  title?: string;
  href: string;
}

export function BackButton({ title = "Back to home", href }: BackButtonProps) {
  return (
    <Button className="text-[#E52330] hover:no-underline" variant="link">
      <Link className="flex items-center gap-1" href={href}>
        <ArrowLeft />
        {title}
      </Link>
    </Button>
  );
}
