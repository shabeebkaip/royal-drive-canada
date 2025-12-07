import { Suspense } from 'react';
import { getFilterOptions } from '@/lib/api';
import VehiclesPageContent from './VehiclesClient';
import { LoadingSkeleton } from '@/components/vehicles';

/**
 * Vehicles Page - Server Component
 * Fetches filter options server-side for optimal performance
 * Data is cached and revalidated automatically
 */
export default async function VehiclesPage() {
  // Fetch all filter options in parallel on the server
  // This happens at build time and revalidates every 5 minutes
  const filterOptions = await getFilterOptions();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <LoadingSkeleton />
          </div>
        </div>
      }
    >
      <VehiclesPageContent
        initialBrands={filterOptions.brands}
        initialBodyTypes={filterOptions.bodyTypes}
        initialFuelTypes={filterOptions.fuelTypes}
        initialTransmissions={filterOptions.transmissions}
      />
    </Suspense>
  );
}
