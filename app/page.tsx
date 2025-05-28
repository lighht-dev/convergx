import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import { MainLayout } from '@/components/layout';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';

export default function HomePage() {
  return (
    <MainLayout title="ConvergX Dashboard">
      {/* Theme testing section */}
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome to ConvergX
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Network management and monitoring platform with Material-UI components and responsive design.
          </Typography>
        </Box>

        <Box display="flex" gap={3} flexWrap="wrap">
          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Typography Test
              </Typography>
              <Typography variant="h6" gutterBottom>
                Heading 6 - Inter Font
              </Typography>
              <Typography variant="body1" paragraph>
                This is body text using the Inter font family. It should be clean and readable
                across all devices and screen sizes.
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Technical Data: 192.168.1.1 - JetBrains Mono
              </Typography>
              <Typography variant="overline" display="block">
                Status: Online - JetBrains Mono
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Color Palette Test
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                <Chip label="Success" color="success" />
                <Chip label="Warning" color="warning" />
                <Chip label="Error" color="error" />
                <Chip label="Info" color="info" />
              </Box>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="contained" color="primary">
                  Primary
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="outlined" color="primary">
                  Outlined
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Responsive Layout Test
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This layout uses Material-UI's responsive system with custom breakpoints:
            576px (sm), 768px (md), 992px (lg), and 1200px (xl).
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {[1, 2, 3, 4].map((item) => (
              <Paper
                key={item}
                sx={{
                  p: 2,
                  minWidth: 120,
                  textAlign: 'center',
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  flex: '1 1 auto',
                }}
              >
                Grid Item {item}
              </Paper>
            ))}
          </Box>
        </Paper>

        {/* Custom Responsive Grid Demo */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Custom Responsive Grid System
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Demonstrating our custom responsive grid component with 12-column layout.
          </Typography>
          <ResponsiveGrid container spacing={2}>
            <ResponsiveGrid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}>
                xs=12 sm=6 md=4 lg=3
              </Paper>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}>
                xs=12 sm=6 md=4 lg=3
              </Paper>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}>
                xs=12 sm=6 md=4 lg=3
              </Paper>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}>
                xs=12 sm=6 md=4 lg=3
              </Paper>
            </ResponsiveGrid>
          </ResponsiveGrid>
        </Paper>

        {/* Network status simulation */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Network Status Colors
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Paper sx={{ p: 2, backgroundColor: 'success.main', color: 'success.contrastText', flex: 1, minWidth: 200 }}>
              <Typography variant="h6">Online</Typography>
              <Typography variant="caption">All systems operational</Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'warning.main', color: 'warning.contrastText', flex: 1, minWidth: 200 }}>
              <Typography variant="h6">Warning</Typography>
              <Typography variant="caption">Performance degraded</Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'error.main', color: 'error.contrastText', flex: 1, minWidth: 200 }}>
              <Typography variant="h6">Offline</Typography>
              <Typography variant="caption">Connection lost</Typography>
            </Paper>
          </Box>
        </Box>
      </Stack>
    </MainLayout>
  );
}
