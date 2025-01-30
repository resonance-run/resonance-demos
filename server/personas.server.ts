import { extractObjectFromFormData } from 'utils/formData';
import { demoUserCookie } from './cookies.server';
import { getResonanceInstance } from './resonance-sdk.server';

export interface DemoUser {
  id: number;
  label: string;
  firstName: string;
  lastName: string;
  userType: string;
  userTier: string;
  userRole: string;
}

export interface UserRoleDisplayV1 {
  EXPERT: string;
  TRAVELER: string;
  DREAMER: string;
  ENTHUSIAST: string;
}

export const getDemoUser = async (request: Request): Promise<DemoUser> => {
  const cookieHeader = request.headers.get('Cookie');
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

export const getUserTierOptions = (): string[] => ['TRIAL', 'FREE', 'BASIC', 'PRO'];
export const getUserTypeOptions = (): string[] => ['FREQUENT', 'INFREQUENT', 'RETURNING'];

export const getUserRoleOptions = async (
  userData: Record<string, unknown>,
  request: Request
): Promise<[string, string][]> => {
  const defaultOptions: UserRoleDisplayV1 = {
    EXPERT: 'Weather expert',
    TRAVELER: 'Traveler',
    DREAMER: 'Dreamer',
    ENTHUSIAST: 'Weather enthusiast',
  };
  const resonance = getResonanceInstance();
  const result = await resonance.loadCustomization<UserRoleDisplayV1>({
    customizationType: 'user-role-display-v1',
    surfaceId: 'USER_ROLE',
    userData,
    request,
    defaultValue: defaultOptions,
  });
  return Object.entries(result).map(([key, value]) => [key, value]);
};

export const setDemoUserCookiesHeaders = async (request: Request): Promise<Headers> => {
  const formData = await request.formData();
  const extractedData = extractObjectFromFormData(formData);
  const viewAs = extractedData.demoUser;

  const headers = new Headers();
  const currentDemoUser: DemoUser = await demoUserCookie.parse(request.headers.get('Cookie'));
  if (viewAs || currentDemoUser) {
    const demoUser = viewAs || currentDemoUser;
    headers.append('Set-Cookie', await demoUserCookie.serialize(demoUser));
  }
  return headers;
};
