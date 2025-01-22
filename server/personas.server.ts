import { extractObjectFromFormData } from 'utils/formData';
import { demoUserCookie, demoUsersCookie } from './cookies.server';

export interface DemoUser {
  id: number;
  label: string;
  firstName: string;
  lastName: string;
  userType: string;
  userTier: string;
}
const defaultDemoUsers: DemoUser[] = [
  {
    id: 1,
    label: 'Persona A',
    firstName: 'John',
    lastName: 'Lennon',
    userType: 'FREQUENT',
    userTier: 'FREE',
  },
  {
    id: 2,
    label: 'Persona B',
    firstName: 'Paul',
    lastName: 'McCartney',
    userType: 'FREQUENT',
    userTier: 'TRIAL',
  },
  {
    id: 3,
    label: 'Persona C',
    firstName: 'George',
    lastName: 'Harrison',
    userType: 'INFREQUENT',
    userTier: 'BASIC',
  },
  {
    id: 4,
    label: 'Persona D',
    firstName: 'Ringo',
    lastName: 'Starr',
    userType: 'RETURNING',
    userTier: 'PRO',
  },
];

export const getDemoUser = async (request: Request): Promise<DemoUser> => {
  const cookieHeader = request.headers.get('Cookie');
  console.log('cookie');
  return (
    (await demoUserCookie.parse(cookieHeader)) || {
      id: 1,
      label: 'Persona A',
      firstName: 'John',
      lastName: 'Lennon',
      userType: 'FREQUENT',
      userTier: 'FREE',
    }
  );
};

export const getDemoUsers = async (request: Request): Promise<DemoUser[]> => {
  const cookieHeader = request.headers.get('Cookie');
  return (await demoUsersCookie.parse(cookieHeader)) || defaultDemoUsers;
};

export const getUserTierOptions = (): string[] => ['TRIAL', 'FREE', 'BASIC', 'PRO'];
export const getUserTypeOptions = (): string[] => ['FREQUENT', 'INFREQUENT', 'RETURNING'];

export const setDemoUserCookiesHeaders = async (request: Request): Promise<Headers> => {
  const formData = await request.formData();
  const extractedData = extractObjectFromFormData(formData);
  const demoUsers: DemoUser[] = extractedData.demoUsers?.filter((u: DemoUser) => Boolean(u));
  const viewAs = extractedData.viewAs;

  const headers = new Headers();
  headers.append('Set-Cookie', await demoUsersCookie.serialize(demoUsers));
  const currentDemoUser: DemoUser = await demoUserCookie.parse(request.headers.get('Cookie'));
  if (viewAs || currentDemoUser) {
    const demoUser = demoUsers
      .filter((u: DemoUser) => Boolean(u))
      // Find the new `viewAs` user _or_ update the currentDemoUser with the latest data
      .find((user: DemoUser) => user.id === (viewAs || currentDemoUser.id));
    headers.append('Set-Cookie', await demoUserCookie.serialize(demoUser));
  }
  return headers;
};
