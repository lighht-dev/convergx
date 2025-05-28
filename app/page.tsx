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
import { 
  NetworkCheck, 
  Speed, 
  Security, 
  Storage 
} from '@mui/icons-material';
import { MainLayout } from '@/components/layout';
import { 
  ResponsiveGrid, 
  StatusIndicator, 
  MetricCard, 
  DataTable,
  type Column 
} from '@/components/ui';

// Sample data for the data table
interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  bandwidth: number;
}

const sampleDevices: NetworkDevice[] = [
  { id: '1', name: 'Router-01', ip: '192.168.1.1', status: 'online', uptime: '15d 4h', bandwidth: 95.2 },
  { id: '2', name: 'Switch-01', ip: '192.168.1.2', status: 'warning', uptime: '8d 12h', bandwidth: 78.5 },
  { id: '3', name: 'AP-01', ip: '192.168.1.3', status: 'offline', uptime: '0d 0h', bandwidth: 0 },
  { id: '4', name: 'Firewall-01', ip: '192.168.1.4', status: 'online', uptime: '22d 8h', bandwidth: 88.9 },
];

const deviceColumns: Column<NetworkDevice>[] = [
  { id: 'name', label: 'Device Name', minWidth: 120 },
  { id: 'ip', label: 'IP Address', minWidth: 120 },
  { 
    id: 'status', 
    label: 'Status', 
    minWidth: 100,
    align: 'center'
  },
  { id: 'uptime', label: 'Uptime', minWidth: 100 },
  { 
    id: 'bandwidth', 
    label: 'Bandwidth Usage (%)', 
    minWidth: 150,
    align: 'right'
  },
];

export default function HomePage() {
  return (
    <MainLayout title="ConvergX Dashboard">
      <main id="main-content">
        <Box sx={{ p: 3 }}>
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              ConvergX Network Management
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Professional network monitoring and management platform with enhanced accessibility features.
            </Typography>
          </Box>

          {/* Accessibility Features Demo */}
          <Card sx={{ mb: 4 }} role="region" aria-labelledby="accessibility-heading">
            <CardContent>
              <Typography 
                id="accessibility-heading"
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Accessibility Features
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This interface includes WCAG 2.1 AA compliant features:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                <Typography component="li" variant="body2">Enhanced color contrast ratios (4.5:1 minimum)</Typography>
                <Typography component="li" variant="body2">Keyboard navigation support with visible focus indicators</Typography>
                <Typography component="li" variant="body2">Screen reader compatibility with ARIA labels</Typography>
                <Typography component="li" variant="body2">Minimum touch target sizes (44px)</Typography>
                <Typography component="li" variant="body2">Skip navigation links for keyboard users</Typography>
                <Typography component="li" variant="body2">Semantic HTML structure with proper headings</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Try navigating with Tab key or using a screen reader to experience these features.
              </Typography>
            </CardContent>
          </Card>

          {/* Status Indicators Demo */}
          <Card sx={{ mb: 4 }} role="region" aria-labelledby="status-heading">
            <CardContent>
              <Typography 
                id="status-heading"
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Network Status Indicators
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enhanced status indicators with accessibility features:
              </Typography>
              
              <ResponsiveGrid container spacing={3}>
                <ResponsiveGrid xs={12} md={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Dot Variants</Typography>
                    <Stack spacing={2}>
                      <StatusIndicator status="online" variant="dot" label="Online" showIcon />
                      <StatusIndicator status="warning" variant="dot" label="Warning" showIcon />
                      <StatusIndicator status="offline" variant="dot" label="Offline" showIcon />
                      <StatusIndicator status="unknown" variant="dot" label="Unknown" showIcon />
                    </Stack>
                  </Paper>
                </ResponsiveGrid>
                
                <ResponsiveGrid xs={12} md={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Chip Variants</Typography>
                    <Stack spacing={2}>
                      <StatusIndicator status="online" variant="chip" showIcon />
                      <StatusIndicator status="warning" variant="chip" showIcon />
                      <StatusIndicator status="offline" variant="chip" showIcon />
                      <StatusIndicator status="unknown" variant="chip" showIcon />
                    </Stack>
                  </Paper>
                </ResponsiveGrid>
                
                <ResponsiveGrid xs={12} md={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Text Variants</Typography>
                    <Stack spacing={2}>
                      <StatusIndicator status="online" variant="text" showIcon />
                      <StatusIndicator status="warning" variant="text" showIcon />
                      <StatusIndicator status="offline" variant="text" showIcon />
                      <StatusIndicator status="unknown" variant="text" showIcon />
                    </Stack>
                  </Paper>
                </ResponsiveGrid>
              </ResponsiveGrid>
            </CardContent>
          </Card>

          {/* Metric Cards Demo */}
          <Card sx={{ mb: 4 }} role="region" aria-labelledby="metrics-heading">
            <CardContent>
              <Typography 
                id="metrics-heading"
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Network Performance Metrics
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Accessible metric cards with comprehensive ARIA labels:
              </Typography>
              
              <ResponsiveGrid container spacing={3}>
                <ResponsiveGrid xs={12} sm={6} lg={3}>
                  <MetricCard
                    title="Network Throughput"
                    value={1.24}
                    unit="Gbps"
                    subtitle="Current data transfer rate"
                    icon={<NetworkCheck />}
                    trend={{
                      direction: 'up',
                      value: 12.5,
                      label: 'vs last hour'
                    }}
                    progress={{
                      value: 75,
                      color: 'success',
                      label: 'Capacity utilization'
                    }}
                    variant="elevated"
                  />
                </ResponsiveGrid>
                
                <ResponsiveGrid xs={12} sm={6} lg={3}>
                  <MetricCard
                    title="Response Time"
                    value={23}
                    unit="ms"
                    subtitle="Average latency"
                    icon={<Speed />}
                    trend={{
                      direction: 'down',
                      value: 8.2,
                      label: 'improvement'
                    }}
                    progress={{
                      value: 23,
                      max: 100,
                      color: 'success',
                      label: 'Performance target'
                    }}
                    variant="outlined"
                  />
                </ResponsiveGrid>
                
                <ResponsiveGrid xs={12} sm={6} lg={3}>
                  <MetricCard
                    title="Security Events"
                    value={3}
                    subtitle="Active threats detected"
                    icon={<Security />}
                    trend={{
                      direction: 'up',
                      value: 50,
                      label: 'requires attention'
                    }}
                    progress={{
                      value: 85,
                      color: 'warning',
                      label: 'Threat level'
                    }}
                  />
                </ResponsiveGrid>
                
                <ResponsiveGrid xs={12} sm={6} lg={3}>
                  <MetricCard
                    title="Storage Usage"
                    value={456}
                    unit="GB"
                    subtitle="Log data stored"
                    icon={<Storage />}
                    trend={{
                      direction: 'neutral',
                      value: 0,
                      label: 'stable'
                    }}
                    progress={{
                      value: 456,
                      max: 1000,
                      color: 'primary',
                      label: 'Storage capacity'
                    }}
                  />
                </ResponsiveGrid>
              </ResponsiveGrid>
            </CardContent>
          </Card>

          {/* Data Table Demo */}
          <Card role="region" aria-labelledby="devices-heading">
            <CardContent>
              <Typography 
                id="devices-heading"
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Network Devices
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Accessible data table with keyboard navigation and screen reader support:
              </Typography>
              
              <DataTable
                data={sampleDevices}
                columns={deviceColumns}
                searchable
                title="Network devices status table"
              />
            </CardContent>
          </Card>
        </Box>
      </main>
    </MainLayout>
  );
}
