export const apiUrl =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'http://localhost:9000'
    : 'https://my-site-diary.onrender.com';
