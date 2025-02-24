import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface DemoContainerProps {
  title: string;
  linkText: string;
  to: string;
  children: ReactNode;
}
export const DemoContainer = ({ title, linkText, to, children }: DemoContainerProps) => {
  return (
    <section className="border border-gray-400 rounded-xl p-4">
      <h3 className="text-3xl mb-4 text-center">{title}</h3>
      {children}
      <div className="flex items-center justify-center my-4">
        <Link to={to} className="underline text-xl">
          {linkText}
        </Link>
      </div>
    </section>
  );
};
