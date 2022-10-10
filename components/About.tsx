import React from 'react';
import { CompanyData } from '../types/iex';

type AboutProps = {
  companyData: CompanyData;
};

export default function About({ companyData }: AboutProps) {
  const companyStats = [
    {
      title: 'CEO',
      stat: companyData.CEO,
    },
    {
      title: 'Employees',
      stat: companyData.employees,
    },
    {
      title: 'Sector',
      stat: companyData.sector,
    },
    {
      title: 'Location',
      stat: `${companyData.city}, ${companyData.state} ${companyData.country}`,
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-xl sm:text-2xl font-semibold mb-2'>About</h2>
        <p>{companyData.description}</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-y-8'>
        {companyStats.map(
          (statItem) =>
            statItem.stat && (
              <div key={statItem.stat} className='space-y-2'>
                <h3 className='uppercase tracking-wider font-semibold text-sm'>
                  {statItem.title}
                </h3>
                <p>{statItem.stat.toLocaleString()}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
