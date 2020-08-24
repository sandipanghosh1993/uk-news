const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  process.env.PORT = 8000;
}
