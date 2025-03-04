import { DashboardModule, type LearningItem } from './Module';

interface DashboardContentProps {
  dashboardModulesList: string[];
  learningContent: LearningItem[];
}
export const DashboardContent = ({ dashboardModulesList, learningContent }: DashboardContentProps) => {
  const contentMap = new Map([['learning', learningContent]]);
  return (
    <>
      {dashboardModulesList.map(module => (
        <DashboardModule name={module} key={module} content={contentMap.get(module)} />
      ))}
    </>
  );
};
