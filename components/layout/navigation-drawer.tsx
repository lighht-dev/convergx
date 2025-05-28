'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  NetworkCheck,
  Security,
  Analytics,
  Settings,
  Devices,
  MonitorHeart,
} from '@mui/icons-material';

interface NavigationItem {
  text: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const navigationItems: NavigationItem[] = [
  { text: 'Dashboard', icon: <Dashboard />, href: '/' },
  { text: 'Network Monitoring', icon: <NetworkCheck />, href: '/network' },
  { text: 'Device Management', icon: <Devices />, href: '/devices' },
  { text: 'Performance', icon: <MonitorHeart />, href: '/performance' },
  { text: 'Analytics', icon: <Analytics />, href: '/analytics' },
  { text: 'Security', icon: <Security />, href: '/security' },
  { text: 'Settings', icon: <Settings />, href: '/settings' },
];

const drawerWidth = 280;

export function NavigationDrawer({ 
  open, 
  onClose, 
  variant = 'temporary' 
}: NavigationDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: '100%' }}>
      {/* Drawer header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          ConvergX
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Network Management Platform
        </Typography>
      </Box>

      {/* Navigation items */}
      <List sx={{ pt: 1 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={item.onClick}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Footer section */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Typography variant="caption" color="text.secondary">
          Version 1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
} 