import type { ReactNode } from 'react';
import { Icon, IconName, IconSize } from '../Icon';

interface DashboardModuleProps {
  name: string;
  content?: LearningItem[];
}

const ModuleContainer = ({ name, icon, children }: { name: string; icon: IconName; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold flex flex-row items-center gap-3 ml-2">
        <Icon name={icon} size={IconSize.small} />
        <span>{name}</span>
      </h2>
      <div className="flex flex-row gap-6">{children}</div>
    </div>
  );
};
const DashboardItem = ({ children, className, url }: { children: ReactNode; className: string; url?: string }) => {
  return (
    <a
      href={url ? url : '/dashboard-demo'}
      className={`rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm overflow-hidden ${className}`}
    >
      {children}
    </a>
  );
};

const RecentItem = ({ name, icon }: { name: string; icon: IconName }) => {
  return (
    <DashboardItem className="w-36">
      <div className="h-1/3 bg-neutral-300 dark:bg-neutral-700 w-36 relative text-neutral-500">
        <Icon
          name={icon}
          className="absolute -bottom-[12px] left-[18px] bg-neutral-300 dark:bg-neutral-700 rounded-lg"
        />
      </div>
      <div className="p-4 pt-8">
        <p>{name}</p>
        <p className="mt-2 text-xs">3h ago</p>
      </div>
    </DashboardItem>
  );
};

const RecentItems = () => {
  return (
    <ModuleContainer name="Recent Items" icon={IconName.clock}>
      <div className="flex flex-row gap-6 h-36">
        <RecentItem name="Teams Home" icon={IconName.compass} />
        <RecentItem name="Getting Started" icon={IconName.pageWithWriting} />
        <RecentItem name="To Do List" icon={IconName.checkSquare} />
        <RecentItem name="Inbox" icon={IconName.inbox} />
      </div>
    </ModuleContainer>
  );
};

const LearnItem = ({
  title,
  img,
  icon,
  url,
  duration,
}: {
  title: string;
  img: string;
  icon: IconName;
  duration: string | number;
  url: string;
}) => {
  return (
    <DashboardItem className="w-72 h-60" url={url}>
      <div className="h-1/2 bg-neutral-200 dark:bg-neutral-700 relative text-neutral-500">
        <div className="h-full overflow-hidden">
          <img src={img} className="object-cover object-bottom w-full" />
        </div>
        <Icon
          name={icon}
          className="absolute -bottom-[12px] left-[24px] bg-neutral-300 dark:bg-neutral-700/50 rounded-lg"
        />
      </div>
      <div className="p-4 pt-8">
        <p>{title}</p>
        <p className="mt-4 text-xs">{duration}m read</p>
      </div>
    </DashboardItem>
  );
};

export interface LearningItem {
  title: string;
  icon: IconName;
  image: string;
  url: string;
  duration: string | number;
}

const LearnItems = ({ content }: { content?: LearningItem[] }) => {
  return (
    <ModuleContainer name="Learn" icon={IconName.book}>
      <div className="flex flex-row gap-6">
        {content?.map(item => (
          <LearnItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            img={item.image}
            url={item.url}
            duration={item.duration}
          />
        ))}
      </div>
    </ModuleContainer>
  );
};

const Featured = () => {
  return (
    <ModuleContainer name="Featured" icon={IconName.sparkles}>
      <DashboardItem className="w-full h-60 p-8 text-neutral-400 flex flex-row gap-12">
        <div className="w-1/2 flex flex-col items-start justify-center border-r border-neutral-600 pl-20">
          <Icon name={IconName.userPlus} size={IconSize.xLarge} />
          <h4 className="text-base mt-6">Invite your friends</h4>
        </div>
        <div className="w-1/2 text-lg flex flex-col gap-4 justify-center">
          <p>No one likes to work alone</p>
          <p>Collaborate with friends to get more done, faster</p>
        </div>
      </DashboardItem>
    </ModuleContainer>
  );
};
const Earnings = () => {
  return (
    <ModuleContainer name="Earnings" icon={IconName.dollarSign}>
      <DashboardItem className="w-full h-60 p-8 text-neutral-400 flex flex-row gap-12">
        <div className="flex flex-col items-center justify-center">
          <h4 className="flex text-lg flex-col items-center justify-center">
            <span>You made</span>
            <span className="text-6xl text-green-700">$914</span>
            <span>this week</span>
          </h4>
        </div>
      </DashboardItem>
    </ModuleContainer>
  );
};

const ComponentMap = new Map<string, React.FC<{ content?: LearningItem[] }>>([
  ['earnings', Earnings],
  ['recent-items', RecentItems],
  ['featured', Featured],
  ['learning', LearnItems],
]);

export const DashboardModule = ({ name, content }: DashboardModuleProps) => {
  const ModuleComponent = ComponentMap.get(name);
  return ModuleComponent ? <ModuleComponent content={content} /> : null;
};
