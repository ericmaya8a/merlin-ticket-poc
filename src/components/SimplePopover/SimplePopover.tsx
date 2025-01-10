"use client";

import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SimplePopoverProps {
  trigger: ReactNode;
  content: ReactNode;
}

export function SimplePopover({ trigger, content }: SimplePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
}
