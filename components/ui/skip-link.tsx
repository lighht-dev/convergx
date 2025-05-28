'use client';

import React from 'react';
import { Box, Link } from '@mui/material';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: -40,
        left: 6,
        zIndex: 9999,
        '&:focus-within': {
          top: 6,
        },
      }}
    >
      <Link
        href={href}
        sx={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          borderRadius: 1,
          fontSize: '0.875rem',
          fontWeight: 500,
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'common.white',
            outlineOffset: '2px',
          },
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href) as HTMLElement;
          if (target && typeof target.focus === 'function') {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {children}
      </Link>
    </Box>
  );
} 