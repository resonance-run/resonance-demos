import type { ReactNode } from 'react';
import { Icon, IconName, IconSize } from '../Icon';

interface DashboardModuleProps {
  name: string;
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
const DashboardItem = ({ children, className }: { children: ReactNode; className: string }) => {
  return (
    <a
      href="/dashboard-demo"
      className={`rounded-xl bg-neutral-800 text-neutral-100 text-sm overflow-hidden ${className}`}
    >
      {children}
    </a>
  );
};

const RecentItem = ({ name, icon }: { name: string; icon: IconName }) => {
  return (
    <DashboardItem className="w-36">
      <div className="h-1/3 bg-neutral-700 w-36 relative text-neutral-500">
        <Icon name={icon} className="absolute -bottom-[12px] left-[18px] bg-neutral-700 rounded-lg" />
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

const LearnItem = ({ title, img, icon }: { title: string; img: string; icon: IconName }) => {
  return (
    <DashboardItem className="w-72 h-60">
      <div className="h-1/2 bg-neutral-700 relative text-neutral-500">
        <div className="h-full overflow-hidden">
          <img src={img} className="object-cover object-bottom w-full" />
        </div>
        <Icon name={icon} className="absolute -bottom-[12px] left-[24px] bg-neutral-700/50 rounded-lg" />
      </div>
      <div className="p-4 pt-8">
        <p>{title}</p>
        <p className="mt-4 text-xs">2m read</p>
      </div>
    </DashboardItem>
  );
};
const LearnItems = () => {
  return (
    <ModuleContainer name="Learn" icon={IconName.book}>
      <div className="flex flex-row gap-6">
        <LearnItem
          title="Your first doc"
          icon={IconName.pencil}
          img="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D"
        />
        <LearnItem
          title="Learn the basics"
          icon={IconName.book}
          img="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8fDA%3D"
        />
        <LearnItem
          title="Use a template"
          icon={IconName.template}
          img="https://images.unsplash.com/photo-1532208248246-ade38054bef6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHN0ZW5jaWx8ZW58MHx8MHx8fDA%3D"
        />
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

const ComponentMap = new Map<string, React.FC>([
  ['recent', RecentItems],
  ['learn', LearnItems],
  ['featured', Featured],
]);

export const DashboardModule = ({ name }: DashboardModuleProps) => {
  const ModuleComponent = ComponentMap.get(name);
  return ModuleComponent ? <ModuleComponent /> : null;
};
