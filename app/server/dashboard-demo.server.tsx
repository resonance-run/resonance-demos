import { IconName } from '~/components/Icon';
import { getResonanceInstance } from './resonance-sdk.server';
import { type LearningItem } from '~/components/dashboard-demo/Module';

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
  return res.moduleNames;
};

interface LearningResult {
  learningItems: LearningItem[];
}
const defaultLearningItems: LearningResult = {
  learningItems: [
    {
      title: 'Your first doc',
      icon: IconName.pencil,
      duration: 3,
      url: '/dashboard-demo',
      image:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Learn the basics',
      icon: IconName.book,
      duration: 3,
      url: '/dashboard-demo',
      image:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Use a template',
      icon: IconName.template,
      duration: 3,
      url: '/dashboard-demo',
      image:
        'https://images.unsplash.com/photo-1532208248246-ade38054bef6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHN0ZW5jaWx8ZW58MHx8MHx8fDA%3D',
    },
  ],
};
export const getLearningContent = async (userData: Record<string, unknown>, request: Request) => {
  const resonance = getResonanceInstance();
  const res: LearningResult = await resonance.loadCustomization<LearningResult>({
    customizationType: 'dashboard-learnings',
    surfaceId: 'DEFAULT',
    userData,
    request,
    defaultValue: defaultLearningItems,
  });
  return res.learningItems;
};

export const getGreeting = (userData: Record<string, unknown>, request: Request) => {
  return userData.firstName ? `Hello, ${userData.firstName}!` : 'Hello!';
};
