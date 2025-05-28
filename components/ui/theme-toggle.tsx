'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@/lib/theme';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  return (
    <Tooltip 
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      arrow
    >
      <IconButton 
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        color="inherit"
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme mode`}
        aria-pressed={mode === 'dark'}
        role="switch"
        sx={{
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'common.white',
            outlineOffset: '2px',
          }
        }}
      >
        {mode === 'light' ? (
          <Brightness4 aria-hidden="true" />
        ) : (
          <Brightness7 aria-hidden="true" />
        )}
      </IconButton>
    </Tooltip>
  );
} 