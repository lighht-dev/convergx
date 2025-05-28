'use client';

import React from 'react';
import { Box, Chip, Typography, useTheme } from '@mui/material';
import { CheckCircle, Cancel, Warning, Help } from '@mui/icons-material';

export type StatusType = 'online' | 'offline' | 'warning' | 'unknown';

interface StatusIndicatorProps {
  status: StatusType;
  variant?: 'dot' | 'chip' | 'text';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  showIcon?: boolean;
  'aria-label'?: string;
}

const statusConfig = {
  online: {
    color: 'success.main' as const,
    label: 'Online',
    icon: CheckCircle,
    ariaLabel: 'Status: Online - Device is connected and functioning normally',
  },
  offline: {
    color: 'error.main' as const,
    label: 'Offline',
    icon: Cancel,
    ariaLabel: 'Status: Offline - Device is disconnected or not responding',
  },
  warning: {
    color: 'warning.main' as const,
    label: 'Warning',
    icon: Warning,
    ariaLabel: 'Status: Warning - Device has issues that need attention',
  },
  unknown: {
    color: 'text.secondary' as const,
    label: 'Unknown',
    icon: Help,
    ariaLabel: 'Status: Unknown - Device status cannot be determined',
  },
};

const sizeConfig = {
  small: { dot: 8, text: '0.75rem', icon: 16 },
  medium: { dot: 12, text: '0.875rem', icon: 20 },
  large: { dot: 16, text: '1rem', icon: 24 },
};

export function StatusIndicator({
  status,
  variant = 'dot',
  size = 'medium',
  label,
  showIcon = false,
  'aria-label': ariaLabel,
}: StatusIndicatorProps) {
  const theme = useTheme();
  const config = statusConfig[status];
  const sizes = sizeConfig[size];
  const IconComponent = config.icon;

  const displayLabel = label || config.label;
  const accessibilityLabel = ariaLabel || config.ariaLabel;

  if (variant === 'dot') {
    return (
      <Box
        component="span"
        role="status"
        aria-label={accessibilityLabel}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: sizes.dot,
            height: sizes.dot,
            borderRadius: '50%',
            backgroundColor: config.color,
            flexShrink: 0,
          }}
        />
        {showIcon && (
          <IconComponent
            sx={{
              fontSize: sizes.icon,
              color: config.color,
            }}
            aria-hidden="true"
          />
        )}
        {label && (
          <Typography
            variant="body2"
            sx={{
              fontSize: sizes.text,
              color: 'text.primary',
            }}
          >
            {displayLabel}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'chip') {
    return (
      <Chip
        icon={showIcon ? <IconComponent /> : undefined}
        label={displayLabel}
        size={size === 'large' ? 'medium' : 'small'}
        role="status"
        aria-label={accessibilityLabel}
        sx={{
          backgroundColor: config.color,
          color: 'white',
          '& .MuiChip-icon': {
            color: 'inherit',
          },
          fontSize: sizes.text,
          minHeight: sizes.dot * 3, // Ensure adequate touch target
        }}
      />
    );
  }

  // Text variant
  return (
    <Box
      component="span"
      role="status"
      aria-label={accessibilityLabel}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {showIcon && (
        <IconComponent
          sx={{
            fontSize: sizes.icon,
            color: config.color,
          }}
          aria-hidden="true"
        />
      )}
      <Typography
        variant="body2"
        sx={{
          fontSize: sizes.text,
          color: config.color,
          fontWeight: 500,
        }}
      >
        {displayLabel}
      </Typography>
    </Box>
  );
} 