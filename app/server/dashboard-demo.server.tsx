import { IconName } from '~/components/Icon';
import { getResonanceInstance } from './resonance-sdk.server';

interface NavSectionLink {
  name: string;
  to: string;
  icon: IconName;
}

interface NavSection {
  id: string;
  title?: string;
  links: NavSectionLink[];
}

export const getNavSections = async (userData: Record<string, unknown>, request: Request): Promise<NavSection[]> => {
  const resonance = getResonanceInstance();
  const mainDefault: NavSection = {
    id: 'main',
    links: [
      { name: 'Search', to: '/dashboard-demo', icon: IconName.search },
      { name: 'Home', to: '/dashboard-demo', icon: IconName.home },
      { name: 'Inbox', to: '/dashboard-demo', icon: IconName.inbox },
    ],
  };
  const main: NavSection = await resonance.loadCustomization<NavSection>({
    customizationType: 'demo-navigation-section',
    surfaceId: 'main',
    userData,
    request,
    defaultValue: mainDefault,
  });

  const privateDefault: NavSection = {
    id: 'private',
    title: 'Private',
    links: [
      { name: 'Getting started', to: '/dashboard-demo', icon: IconName.pageWithWriting },
      { name: 'To Do List', to: '/dashboard-demo', icon: IconName.checkSquare },
      { name: 'Travel Planner', to: '/dashboard-demo', icon: IconName.plane },
    ],
  };
  const privateSection: NavSection = await resonance.loadCustomization({
    customizationType: 'demo-navigation-section',
    surfaceId: 'private',
    userData,
    request,
    defaultValue: privateDefault,
  });

  const teamsDefault: NavSection = {
    id: 'team',
    title: 'Teams',
    links: [
      { name: 'Direction', to: '/dashboard-demo', icon: IconName.compass },
      { name: 'Add new', to: '/dashboard-demo', icon: IconName.plus },
    ],
  };

  const teamsSection: NavSection = await resonance.loadCustomization({
    customizationType: 'demo-navigation-section',
    surfaceId: 'team',
    userData,
    request,
    defaultValue: teamsDefault,
  });

  const adminDefault: NavSection = {
    id: 'admin',
    links: [
      { name: 'Settings', to: '/dashboard-demo', icon: IconName.settings },
      { name: 'Templates', to: '/dashboard-demo', icon: IconName.template },
      { name: 'Trash', to: '/dashboard-demo', icon: IconName.trash },
    ],
  };

  const admin: NavSection = await resonance.loadCustomization({
    customizationType: 'demo-navigation-section',
    surfaceId: 'admin',
    userData,
    request,
    defaultValue: adminDefault,
  });

  return [main, privateSection, teamsSection, admin];
};

export const getDashboardModules = async (userData: Record<string, unknown>, request: Request) => {
  const resonance = getResonanceInstance();
  const res = await resonance.loadCustomization({
    customizationType: 'dashboard-modules',
    surfaceId: 'DEFAULT',
    userData,
    request,
    defaultValue: {
      moduleNames: ['earnings', 'recent-items', 'featured', 'learning'],
    },
  });
  console.log(res);
  return res.moduleNames;
};

export const getGreeting = (userData: Record<string, unknown>, request: Request) => {
  return userData.firstName ? `Hello, ${userData.firstName}!` : 'Hello!';
};
