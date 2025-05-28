'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: number;
    label?: string;
  };
  progress?: {
    value: number;
    max?: number;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    label?: string;
  };
  variant?: 'default' | 'outlined' | 'elevated';
  'aria-label'?: string;
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    color: 'success.main' as const,
    ariaLabel: 'trending upward',
  },
  down: {
    icon: TrendingDown,
    color: 'error.main' as const,
    ariaLabel: 'trending downward',
  },
  neutral: {
    icon: TrendingFlat,
    color: 'text.secondary' as const,
    ariaLabel: 'stable',
  },
};

export function MetricCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  trend,
  progress,
  variant = 'default',
  'aria-label': ariaLabel,
}: MetricCardProps) {
  const theme = useTheme();

  const cardVariants = {
    default: {},
    outlined: { variant: 'outlined' as const },
    elevated: { elevation: 4 },
  };

  const TrendIcon = trend ? trendConfig[trend.direction].icon : null;
  const trendColor = trend ? trendConfig[trend.direction].color : undefined;
  const trendAriaLabel = trend ? trendConfig[trend.direction].ariaLabel : undefined;

  // Create comprehensive aria-label
  const cardAriaLabel = ariaLabel ||
    `${title}: ${value}${unit ? ` ${unit}` : ''}${
      subtitle ? `, ${subtitle}` : ''
    }${trend ? `, ${trendAriaLabel} by ${trend.value}%` : ''}${
      progress ? `, progress at ${progress.value}${progress.max ? ` out of ${progress.max}` : '%'}` : ''
    }`;

  return (
    <Card
      {...cardVariants[variant]}
      role="region"
      aria-label={cardAriaLabel}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header with title and icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-hidden="true"
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Main value */}
        <Box sx={{ mb: subtitle || trend || progress ? 2 : 0 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'baseline',
              gap: 0.5,
            }}
          >
            <span aria-label={`Value: ${value}`}>{value}</span>
            {unit && (
              <Typography
                component="span"
                variant="body1"
                sx={{
                  fontSize: '1rem',
                  color: 'text.secondary',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                aria-label={`Unit: ${unit}`}
              >
                {unit}
              </Typography>
            )}
          </Typography>
        </Box>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: trend || progress ? 1 : 0,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Trend indicator */}
        {trend && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mb: progress ? 1 : 0,
            }}
            role="status"
            aria-label={`Trend: ${trendAriaLabel} by ${trend.value}%${trend.label ? `, ${trend.label}` : ''}`}
          >
            {TrendIcon && (
              <TrendIcon
                sx={{
                  fontSize: 16,
                  color: trendColor,
                }}
                aria-hidden="true"
              />
            )}
            <Typography
              variant="body2"
              sx={{
                color: trendColor,
                fontWeight: 500,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
              {Math.abs(trend.value)}%
            </Typography>
            {trend.label && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              >
                {trend.label}
              </Typography>
            )}
          </Box>
        )}

        {/* Progress bar */}
        {progress && (
          <Box sx={{ mt: 1 }}>
            {progress.label && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mb: 0.5,
                }}
                id={`progress-label-${title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {progress.label}
              </Typography>
            )}
            <LinearProgress
              variant="determinate"
              value={progress.max ? (progress.value / progress.max) * 100 : progress.value}
              color={progress.color || 'primary'}
              role="progressbar"
              aria-valuenow={progress.value}
              aria-valuemin={0}
              aria-valuemax={progress.max || 100}
              aria-label={`Progress: ${progress.value}${progress.max ? ` out of ${progress.max}` : '%'}`}
              aria-describedby={progress.label ? `progress-label-${title.replace(/\s+/g, '-').toLowerCase()}` : undefined}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
} 