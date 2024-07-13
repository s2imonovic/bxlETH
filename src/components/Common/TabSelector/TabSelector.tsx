import React, { useEffect } from 'react';
import clsx from 'clsx';

export interface ISingleTab<ID = string> {
  id: ID;
  title: string;
  tabClassName?: string;
  hiddenAt?: boolean;
  extraTabContent?: JSX.Element;
}

interface ITabSelector<T extends string> {
  tabs: ISingleTab<T>[];
  activeTab: T;
  setTab: React.Dispatch<React.SetStateAction<T>>;
  className?: string;
  sessionStorageKey?: string;
}

export default function TabSelector<T extends string>({ tabs, className, setTab, activeTab }: ITabSelector<T>) {
  return (
    <div className={clsx('pt-4 border-border-secondary border-b', className)}>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <div className="flex flex-col items-center gap-2">
            <span
              className={clsx(
                'cursor-pointer hover:opacity-90 px-3 py-2.5 text-md text-[#8F8F8F] rounded-[14px] transition hover:bg-[#303030]',
                {
                  'text-secondary': tab.id === activeTab,
                },
              )}
              onClick={() => setTab(tab.id)}
            >
              {tab.title}
            </span>
            <div
              className={clsx('w-full min-h-[2px] bg-secondary transition', {
                'opacity-0': activeTab !== tab.id,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
