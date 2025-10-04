import { getLatestVehicles } from '@/lib/api';
import LatestVehiclesClient from '@/components/home/LatestVehiclesClient';

/**
 * Server Component: Latest Vehicles Section
 * Fetches latest 8 vehicles from API and passes to client component
 */
export default async function LatestVehicles() {
  // Fetch latest 8 vehicles from API
  const vehicles = await getLatestVehicles(8);

  return <LatestVehiclesClient vehicles={vehicles} />;
}
