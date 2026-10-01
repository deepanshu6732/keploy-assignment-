"use client";

import * as React from "react";

interface ScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}

export function ScrollLink({ targetId, children, className, ...props }: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const cleanId = targetId.replace(/^#/, "");
    const targetElement = document.getElementById(cleanId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${cleanId}`);
    } else {
      // Fallback: direct window location hash
      window.location.hash = cleanId;
    }
  };

  return (
    <a
      href={`#${targetId.replace(/^#/, "")}`}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
