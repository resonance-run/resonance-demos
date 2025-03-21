import { createCookie } from 'react-router';

export const demoUserCookie = createCookie('demo-user', {
  path: '/',
  sameSite: 'lax',
  secrets: [process.env.SESSION_SECRET || ''],
});
