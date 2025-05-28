import { createTheme, Theme } from '@mui/material/styles';

// Define custom color palette based on PRD requirements
const colors = {
  primary: {
    main: '#1976d2', // Professional blue
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#424242', // Professional gray
    light: '#6d6d6d',
    dark: '#212121',
    contrastText: '#ffffff',
  },
  // Network status colors as specified in PRD
  success: {
    main: '#4caf50', // Green for healthy/online
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff9800', // Yellow for warning states
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#000000',
  },
  error: {
    main: '#f44336', // Red for error/offline states
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
};

// Typography configuration with Inter and JetBrains Mono
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    lineHeight: 1.43,
  },
  // Technical data typography using JetBrains Mono
  caption: {
    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
    fontSize: '0.75rem',
    lineHeight: 1.66,
  },
  overline: {
    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
    fontSize: '0.75rem',
    lineHeight: 2.66,
    textTransform: 'uppercase' as const,
  },
};

// Custom breakpoints based on PRD requirements
const breakpoints = {
  values: {
    xs: 0,
    sm: 576, // PRD specified breakpoint
    md: 768, // PRD specified breakpoint
    lg: 992, // PRD specified breakpoint
    xl: 1200, // PRD specified breakpoint
  },
};

// 8-pixel grid spacing system
const spacing = 8;

// Light theme configuration
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    ...colors,
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#e0e0e0',
  },
  typography,
  breakpoints,
  spacing,
  shape: {
    borderRadius: 8, // Consistent with 8px grid
  },
  components: {
    // Global component overrides for consistent styling
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#f5f5f5',
            width: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Dark theme configuration
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    ...colors,
    primary: {
      ...colors.primary,
      main: '#90caf9', // Lighter blue for dark mode
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    divider: '#333333',
  },
  typography,
  breakpoints,
  spacing,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        },
      },
    },
  },
});

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// Helper function to get theme by mode
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
}; 