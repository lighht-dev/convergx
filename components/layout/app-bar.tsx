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
    <MuiAppBar 
      position="sticky" 
      elevation={1}
      component="header"
      role="banner"
    >
      <Toolbar>
        {/* Menu button for mobile/drawer toggle */}
        {showMenuButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="navigation-drawer"
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'common.white',
                outlineOffset: '2px',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* App title */}
        <Typography 
          variant="h6" 
          component="h1" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        {/* Right side actions */}
        <Box 
          display="flex" 
          alignItems="center" 
          gap={1}
          component="nav"
          role="navigation"
          aria-label="User actions"
        >
          {/* Notifications - hide on mobile */}
          {!isMobile && (
            <IconButton 
              color="inherit" 
              aria-label="View notifications"
              aria-describedby="notifications-tooltip"
              sx={{
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'common.white',
                  outlineOffset: '2px',
                }
              }}
            >
              <Notifications />
            </IconButton>
          )}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* User account */}
          <IconButton 
            color="inherit" 
            aria-label="Open user account menu"
            aria-describedby="account-tooltip"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'common.white',
                outlineOffset: '2px',
              }
            }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
} 