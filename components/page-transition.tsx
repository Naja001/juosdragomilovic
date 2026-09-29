import { ViewTransition } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-shift" exit="page-shift" default="none">
      {children}
    </ViewTransition>
  );
}
