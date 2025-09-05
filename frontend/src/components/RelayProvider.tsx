'use client';

import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from '../lib/relay-environment';

interface RelayProviderProps {
  children: React.ReactNode;
}

export function RelayProvider({ children }: RelayProviderProps) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}