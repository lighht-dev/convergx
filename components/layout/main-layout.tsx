'use client';

import React, { useState } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { AppBar } from './app-bar';
import { NavigationDrawer } from './navigation-drawer';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disablePadding?: boolean;
}

export function MainLayout({ 
  children, 
  title,
  maxWidth = 'xl',
  disablePadding = false 
}: MainLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        title={title}
        onMenuClick={handleDrawerToggle}
        showMenuButton={true}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        variant={isMobile ? 'temporary' : 'persistent'}
      />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          pt: '64px', // AppBar height
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(drawerOpen && !isMobile && {
            marginLeft: '280px', // Drawer width
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        {disablePadding ? (
          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        ) : (
          <Container 
            maxWidth={maxWidth} 
            sx={{ 
              flexGrow: 1, 
              py: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </Container>
        )}
      </Box>
    </Box>
  );
} 