/**
 * Browse Section - Server Component Wrapper
 * Fetches data server-side and passes to client component
 */

import { getVehicleTypes, getBrands } from '@/lib/api';
import BrowseSectionClient from './BrowseSectionClient';

export default async function BrowseSection() {
  // Fetch both vehicle types and brands server-side in parallel
  // This happens at build time and revalidates every 60 seconds
  // Using Promise.all for optimal performance - both requests happen simultaneously
  const [vehicleTypes, brands] = await Promise.all([
    getVehicleTypes(),
    getBrands(),
  ]);

  return <BrowseSectionClient vehicleTypes={vehicleTypes} brands={brands} />;
}
