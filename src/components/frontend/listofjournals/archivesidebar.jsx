import React, { useState } from 'react';

// Example data: volumes with multiple issues
const volumesData = [
  {
    year: 2024,
    volumeNumber: 5,
    issues: [
      { issueNumber: 1, months: 'January-December' },
    ],
  },
  {
    year: 2024,
    volumeNumber: 3,
    issues: [
      { issueNumber: 1, months: 'January-February' },
      { issueNumber: 2, months: 'March-April' },
    ],
  },
  {
    year: 2021,
    volumeNumber: 1,
    issues: [
      { issueNumber: 1, months: 'January-December' },
      { issueNumber: 2, months: 'July-December' },
    ],
  },
];

function Sidebar({ onSelectIssue }) {
  const [openVolumeIndex, setOpenVolumeIndex] = useState(null);

  const toggleVolume = (index) => {
    console.log(index)
    // Click again to close
    if (openVolumeIndex === index) {
      setOpenVolumeIndex(null);
    } else {
      setOpenVolumeIndex(index);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ARCHIVE</h2>
      {volumesData.map((vol, idx) => (
        <div key={idx} className="mb-3 border-b pb-2">
          {/* Volume Title */}
          <div
            className="cursor-pointer font-semibold flex items-center justify-between"
            onClick={() => toggleVolume(idx)}
          >
            <span>
              {vol.year}, Volume {vol.volumeNumber}
            </span>
            {/* Plus/Minus Symbol */}
            <span>
              {openVolumeIndex === idx ? '-' : '+'}
            </span>
          </div>
          
          {/* Issues List (expand if this volume is open) */}
          {openVolumeIndex === idx && (
            <div className="mt-2 pl-4">
              {vol.issues.map((issue, iIdx) => (
                <div
                  key={iIdx}
                  className="py-1 cursor-pointer text-gray-700 hover:text-blue-500"
                  onClick={() => {
                    // Let parent know which issue was clicked
                    onSelectIssue({
                      year: vol.year,
                      volume: vol.volumeNumber,
                      issue: issue.issueNumber,
                      months: issue.months,
                    });
                  }}
                >
                  Vol. {vol.volumeNumber}, Issue {issue.issueNumber}, {issue.months}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
