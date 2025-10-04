/**
 * Featured Vehicles - Server Component
 * Fetches featured vehicles from API server-side
 */

import { getFeaturedVehicles } from '@/lib/api';
import FeaturedVehiclesClient from './FeaturedVehiclesClient';

export default async function FeaturedVehicles() {
  // Fetch featured vehicles server-side
  // This happens at build time and revalidates every 60 seconds
  const featuredVehicles = await getFeaturedVehicles(4);

  return <FeaturedVehiclesClient vehicles={featuredVehicles} />;
}
