import React from 'react';
import { CompanyData } from '../types/iex';

type AboutProps = {
  companyData: CompanyData;
};

export default function AboutSection({ companyData }: AboutProps) {
  if (!companyData.description) {
    return (
      <p className='text-neutral-400'>Company information not available</p>
    );
  }

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
      <p className='text-neutral-700 dark:text-neutral-300'>
        {companyData.description}
      </p>

      <div className='grid grid-cols-2 gap-y-8 sm:grid-cols-4'>
        {companyStats.map(
          (statItem) =>
            statItem.stat && (
              <div key={statItem.stat} className='space-y-2'>
                <h3 className='font-semibold'>{statItem.title}</h3>

                <p className='text-neutral-700 dark:text-neutral-300'>
                  {statItem.stat.toLocaleString()}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
