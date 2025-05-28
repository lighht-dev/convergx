'use client';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Notifications, AccountCircle } from '@mui/icons-material';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface AppBarProps {
  title?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function AppBar({ 
  title = 'ConvergX', 
  onMenuClick,
  showMenuButton = true 
}: AppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MuiAppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Menu button for mobile/drawer toggle */}
        {showMenuButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* App title */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        {/* Right side actions */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Notifications - hide on mobile */}
          {!isMobile && (
            <IconButton color="inherit" aria-label="notifications">
              <Notifications />
            </IconButton>
          )}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* User account */}
          <IconButton color="inherit" aria-label="account">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
} 