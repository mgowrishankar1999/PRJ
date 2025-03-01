import React from 'react';

function ArchiveMainContent({ selectedIssue }) {
  if (!selectedIssue) {
    // If no issue is selected yet, just show a default heading
    return (
      <div>
        <div className="text-3xl font-medium uppercase border-b-2 border-blue-500 pb-1 mb-4">
          Archive
        </div>
        <p>Please select a volume & issue from the sidebar.</p>
      </div>
    );
  }

  // Once we have a selected issue, display details
  const { year, volume, issue, months } = selectedIssue;
  return (
    <div>
      <div className="text-2xl font-medium border-b-2 border-blue-500 pb-1 mb-4">
        Archive Volume {volume}, Issue {issue}, {months}
      </div>
      <div className="text-xl font-semibold mb-2">Articles Published: 0</div>
      <div className="text-md text-gray-500">No records</div>
    </div>
  );
}

export default ArchiveMainContent;
