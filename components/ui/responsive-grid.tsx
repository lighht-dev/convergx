'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ResponsiveGridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  sx?: SxProps<Theme>;
}

export function ResponsiveGrid({
  children,
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  sx,
}: ResponsiveGridProps) {
  const theme = useTheme();
  
  // Calculate responsive width based on breakpoints
  const getResponsiveWidth = () => {
    const breakpoints = {
      xs: xs ? (xs === 'auto' ? 'auto' : `${(xs / 12) * 100}%`) : undefined,
      sm: sm ? (sm === 'auto' ? 'auto' : `${(sm / 12) * 100}%`) : undefined,
      md: md ? (md === 'auto' ? 'auto' : `${(md / 12) * 100}%`) : undefined,
      lg: lg ? (lg === 'auto' ? 'auto' : `${(lg / 12) * 100}%`) : undefined,
      xl: xl ? (xl === 'auto' ? 'auto' : `${(xl / 12) * 100}%`) : undefined,
    };

    return {
      width: breakpoints.xs,
      [theme.breakpoints.up('sm')]: {
        width: breakpoints.sm || breakpoints.xs,
      },
      [theme.breakpoints.up('md')]: {
        width: breakpoints.md || breakpoints.sm || breakpoints.xs,
      },
      [theme.breakpoints.up('lg')]: {
        width: breakpoints.lg || breakpoints.md || breakpoints.sm || breakpoints.xs,
      },
      [theme.breakpoints.up('xl')]: {
        width: breakpoints.xl || breakpoints.lg || breakpoints.md || breakpoints.sm || breakpoints.xs,
      },
    };
  };

  const containerStyles = container ? {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: theme.spacing(spacing),
    margin: spacing ? theme.spacing(-spacing / 2) : 0,
  } : {};

  const itemStyles = item ? {
    ...getResponsiveWidth(),
    flexGrow: xs === 'auto' || sm === 'auto' || md === 'auto' || lg === 'auto' || xl === 'auto' ? 1 : 0,
    flexShrink: 0,
    padding: spacing ? theme.spacing(spacing / 2) : 0,
  } : {};

  return (
    <Box
      sx={{
        ...containerStyles,
        ...itemStyles,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
} 