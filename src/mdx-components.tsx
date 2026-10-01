import type { MDXComponents } from 'mdx/types';
import * as React from 'react';
import { Callout } from '@/components/Callout';
import { ScrollLink } from '@/components/ScrollLink';

function toSlug(children: React.ReactNode, explicitId?: string): string {
  if (explicitId) return explicitId;
  const rawText = React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('');
  return rawText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    ScrollLink,
    h2: ({ children, id, className, ...props }) => {
      const slugId = toSlug(children, id);
      return (
        <h2 id={slugId} className={`scroll-mt-24 ${className || ''}`} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, id, className, ...props }) => {
      const slugId = toSlug(children, id);
      return (
        <h3 id={slugId} className={`scroll-mt-24 ${className || ''}`} {...props}>
          {children}
        </h3>
      );
    },
    ...components,
  };
}
