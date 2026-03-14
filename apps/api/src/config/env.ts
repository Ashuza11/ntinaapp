export const config = {
  env: (process.env.NODE_ENV ?? 'development') as 'development' | 'production' | 'test',
  port: parseInt(process.env.PORT ?? '3001', 10),
  database: {
    url: process.env.DATABASE_URL ?? '',
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  },
  storage: {
    endpoint: process.env.STORAGE_ENDPOINT ?? '',
    bucket: process.env.STORAGE_BUCKET ?? 'ntina-media',
    accessKey: process.env.STORAGE_ACCESS_KEY ?? '',
    secretKey: process.env.STORAGE_SECRET_KEY ?? '',
    region: process.env.STORAGE_REGION ?? 'af-south-1',
  },
} as const
