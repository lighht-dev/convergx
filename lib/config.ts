/**
 * Configuration utility for ConvergX
 * Handles environment variables with validation and type safety
 */

interface Config {
  // Application
  nodeEnv: string;
  appName: string;
  appVersion: string;
  appUrl: string;

  // Database
  databaseUrl: string;
  databasePoolSize: number;

  // Redis
  redisUrl: string;
  redisPassword?: string;
  redisDb: number;

  // Authentication
  nextAuthSecret: string;
  nextAuthUrl: string;
  jwtSecret: string;

  // Session
  sessionTimeout: number;
  sessionSecure: boolean;

  // Network API
  networkApiBaseUrl: string;
  networkApiKey: string;
  networkApiTimeout: number;

  // Monitoring
  monitoringEnabled: boolean;
  analyticsEnabled: boolean;
  logLevel: string;

  // Email
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;

  // File Upload
  maxFileSize: number;
  uploadDir: string;
  allowedFileTypes: string[];

  // Rate Limiting
  rateLimitEnabled: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number;
}

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value || defaultValue!;
}

function getEnvNumber(name: string, defaultValue?: number): number {
  const value = process.env[name];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  const parsed = parseInt(value || String(defaultValue), 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid number`);
  }
  return parsed;
}

function getEnvBoolean(name: string, defaultValue: boolean = false): boolean {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

function getEnvArray(name: string, defaultValue: string[] = []): string[] {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value.split(',').map(item => item.trim());
}

// Create and validate configuration
export const config: Config = {
  // Application
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
  appName: getEnvVar('NEXT_PUBLIC_APP_NAME', 'ConvergX'),
  appVersion: getEnvVar('NEXT_PUBLIC_APP_VERSION', '1.0.0'),
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),

  // Database
  databaseUrl: getEnvVar(
    'DATABASE_URL',
    'postgresql://localhost:5432/convergx'
  ),
  databasePoolSize: getEnvNumber('DATABASE_POOL_SIZE', 10),

  // Redis
  redisUrl: getEnvVar('REDIS_URL', 'redis://localhost:6379'),
  redisPassword: process.env.REDIS_PASSWORD,
  redisDb: getEnvNumber('REDIS_DB', 0),

  // Authentication
  nextAuthSecret: getEnvVar(
    'NEXTAUTH_SECRET',
    'development-secret-change-in-production'
  ),
  nextAuthUrl: getEnvVar('NEXTAUTH_URL', 'http://localhost:3000'),
  jwtSecret: getEnvVar(
    'JWT_SECRET',
    'development-jwt-secret-change-in-production'
  ),

  // Session
  sessionTimeout: getEnvNumber('SESSION_TIMEOUT', 3600),
  sessionSecure: getEnvBoolean('SESSION_SECURE', false),

  // Network API
  networkApiBaseUrl: getEnvVar(
    'NETWORK_API_BASE_URL',
    'https://api.example.com'
  ),
  networkApiKey: getEnvVar('NETWORK_API_KEY', 'development-api-key'),
  networkApiTimeout: getEnvNumber('NETWORK_API_TIMEOUT', 30000),

  // Monitoring
  monitoringEnabled: getEnvBoolean('MONITORING_ENABLED', true),
  analyticsEnabled: getEnvBoolean('ANALYTICS_ENABLED', false),
  logLevel: getEnvVar('LOG_LEVEL', 'info'),

  // Email
  smtpHost: getEnvVar('SMTP_HOST', 'smtp.example.com'),
  smtpPort: getEnvNumber('SMTP_PORT', 587),
  smtpUser: getEnvVar('SMTP_USER', ''),
  smtpPass: getEnvVar('SMTP_PASS', ''),
  smtpFrom: getEnvVar('SMTP_FROM', 'noreply@convergx.com'),

  // File Upload
  maxFileSize: getEnvNumber('MAX_FILE_SIZE', 10485760), // 10MB
  uploadDir: getEnvVar('UPLOAD_DIR', './uploads'),
  allowedFileTypes: getEnvArray('ALLOWED_FILE_TYPES', [
    '.pdf',
    '.csv',
    '.xlsx',
    '.json',
  ]),

  // Rate Limiting
  rateLimitEnabled: getEnvBoolean('RATE_LIMIT_ENABLED', true),
  rateLimitRequests: getEnvNumber('RATE_LIMIT_REQUESTS', 100),
  rateLimitWindow: getEnvNumber('RATE_LIMIT_WINDOW', 900000), // 15 minutes
};

// Validation functions
export function validateConfig(): void {
  const errors: string[] = [];

  // Validate required production settings
  if (config.nodeEnv === 'production') {
    if (config.nextAuthSecret === 'development-secret-change-in-production') {
      errors.push(
        'NEXTAUTH_SECRET must be set to a secure value in production'
      );
    }
    if (config.jwtSecret === 'development-jwt-secret-change-in-production') {
      errors.push('JWT_SECRET must be set to a secure value in production');
    }
    if (!config.sessionSecure) {
      errors.push('SESSION_SECURE should be true in production');
    }
  }

  // Validate URLs
  try {
    new URL(config.appUrl);
  } catch {
    errors.push('NEXT_PUBLIC_APP_URL must be a valid URL');
  }

  try {
    new URL(config.networkApiBaseUrl);
  } catch {
    errors.push('NETWORK_API_BASE_URL must be a valid URL');
  }

  // Validate numeric ranges
  if (config.databasePoolSize < 1 || config.databasePoolSize > 100) {
    errors.push('DATABASE_POOL_SIZE must be between 1 and 100');
  }

  if (config.sessionTimeout < 300 || config.sessionTimeout > 86400) {
    errors.push(
      'SESSION_TIMEOUT must be between 300 (5 min) and 86400 (24 hours)'
    );
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
}

// Helper functions
export function isDevelopment(): boolean {
  return config.nodeEnv === 'development';
}

export function isProduction(): boolean {
  return config.nodeEnv === 'production';
}

export function isTest(): boolean {
  return config.nodeEnv === 'test';
}

// Initialize and validate configuration on import
if (typeof window === 'undefined') {
  // Only validate on server side
  try {
    validateConfig();
  } catch (error) {
    console.error('Configuration validation failed:', error);
    if (isProduction()) {
      process.exit(1);
    }
  }
}
