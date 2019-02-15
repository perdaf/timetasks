import React from 'react';
import ResumStat from './charts/ResumStat';
import ProjectStat from './charts/ProjectStat';

function StatPresentation() {
  return (
    <div>
      <ResumStat />
      <ProjectStat />
    </div>
  );
}

export default StatPresentation;
