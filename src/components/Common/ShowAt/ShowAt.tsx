import React from 'react';

interface IShowAt {
  at: boolean;
  children: React.ReactNode[] | React.ReactNode;
}

export default function ShowAt({ at, children }: IShowAt) {
  return <>{!!at && children}</>;
}
