/**
 * Browse Section - Server Component Wrapper
 * Fetches data server-side and passes to client component
 */

import { getVehicleTypes } from '@/lib/api';
import BrowseSectionClient from './BrowseSectionClient';
import { brands } from '@/constants';

export default async function BrowseSection() {
  // Fetch vehicle types server-side
  // This happens at build time and revalidates every 60 seconds
  const vehicleTypes = await getVehicleTypes();

  return <BrowseSectionClient vehicleTypes={vehicleTypes} brands={brands} />;
}
