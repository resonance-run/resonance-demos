import { IconName } from '~/components/Icon';

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

export const getNavSections = (userData: Record<string, unknown>, request: Request): NavSection[] => {
  return [
    {
      id: 'main',
      links: [
        { name: 'Search', to: '/dashboard-demo', icon: IconName.search },
        { name: 'Home', to: '/dashboard-demo', icon: IconName.home },
        { name: 'Inbox', to: '/dashboard-demo', icon: IconName.inbox },
      ],
    },
    {
      id: 'private',
      title: 'Private',
      links: [
        { name: 'Getting started', to: '/dashboard-demo', icon: IconName.pageWithWriting },
        { name: 'To Do List', to: '/dashboard-demo', icon: IconName.checkSquare },
        { name: 'Travel Planner', to: '/dashboard-demo', icon: IconName.plane },
      ],
    },
    {
      id: 'team',
      title: 'Teams',
      links: [
        { name: 'Direction', to: '/dashboard-demo', icon: IconName.compass },
        { name: 'Add new', to: '/dashboard-demo', icon: IconName.plus },
      ],
    },
    {
      id: 'admin',
      links: [
        { name: 'Settings', to: '/dashboard-demo', icon: IconName.settings },
        { name: 'Templates', to: '/dashboard-demo', icon: IconName.template },
        { name: 'Trash', to: '/dashboard-demo', icon: IconName.trash },
      ],
    },
  ];
};

export const getDashboardModules = (userData: Record<string, unknown>, request: Request) => {
  return ['recent', 'featured', 'learn'];
};

export const getGreeting = (userData: Record<string, unknown>, request: Request) => {
  return userData.firstName ? `Hello, ${userData.firstName}!` : 'Hello!';
};
