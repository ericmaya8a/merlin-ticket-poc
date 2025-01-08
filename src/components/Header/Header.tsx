import { PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  return <div className="min-h-20 bg-[#144722] p-4 text-white">{children}</div>;
}
