import React from 'react';

export function TaskSkeleton() {
  return (
    <div className="skeleton-task">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <div className="skeleton skeleton-status"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-description"></div>
        </div>
        <div className="skeleton skeleton-action"></div>
      </div>
      <div style={{ marginTop: 'var(--space-sm)', paddingTop: 'var(--space-sm)', borderTop: '1px solid rgba(166, 124, 82, 0.1)' }}>
        <div className="skeleton skeleton-date"></div>
      </div>
    </div>
  );
}

export function TaskListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {Array.from({ length: count }, (_, i) => (
        <TaskSkeleton key={i} />
      ))}
      <div className="loading-text-animated">
        Loading your tasks...
      </div>
    </div>
  );
}